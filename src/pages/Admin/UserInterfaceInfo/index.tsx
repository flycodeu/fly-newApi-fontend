import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';

import CreateModal from '@/pages/Admin/InterfaceInfo/components/CreateModal';
import UpdateModal from '@/pages/Admin/InterfaceInfo/components/UpdateModal';
import {
  addUserInterfaceInfoUsingPOST,
  deleteUserInterfaceInfoUsingPOST,
  getAllUserInterfaceInfoDetailByPageUsingPOST,
} from '@/services/fly/userInterfaceInfoController';
import { updateInterfaceInfoUsingPOST } from '@/services/fly/interfaceController';
// import { FormattedMessage } from 'react-intl';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoNew>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoNew[]>([]);
  const [currentId, setCurrentId] = useState<number>();
  const token = localStorage.getItem('token');


  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserInterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addUserInterfaceInfoUsingPOST({
        ...fields
      });
      hide();
      if (res.data) {
        message.success('创建成功');
        handleModalOpen(false);
        actionRef.current?.reload(); // 刷新表格数据
        return true;
      }
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败,' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserInterfaceInfo) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPOST({
        id: currentRow.id,
        ...fields,
      });
      hide();
      actionRef.current?.reload(); // 刷新表格数据
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败,' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.UserInterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteUserInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败,' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.UserInterfaceInfoVo>[] = [
      {
        title: 'ID',
        dataIndex: 'id',
        valueType: 'index',
        ellipsis: true,
      },
      {
        title: '用户id',
        dataIndex: 'userId',
        valueType: 'text',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        }
      },
      {
        title: '接口id',
        dataIndex: 'interfaceInfoId',
        valueType: 'text',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
    {
      title: '用户名字',
      dataIndex: 'userName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      }
    },
    {
      title: '接口名字',
      dataIndex: 'interfaceInfoName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
      {
        title: '剩余次数',
        dataIndex: 'leftCount',
        valueType: 'digit',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
      {
        title: '总调用次数',
        dataIndex: 'totalCount',
        valueType: 'digit',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
    {
      title: '用户接口状态',
      dataIndex: 'status',
      valueType: 'text',
      valueEnum: {
        0: {
          text: '正常',
          status: 'Processing',
        },
        1: {
          text: '异常',
          status: 'Error',
        },
      },
    },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => [
          <a
            key="config"
            onClick={() => {
              handleUpdateModalOpen(true);
              setCurrentRow(record);
            }}
          >
            修改
          </a>,
          <a
            key="danger"
            onClick={() => {
              handleRemove(record);
            }}
          >
            删除
          </a>
        ],
      },
    ];

  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="接口展示"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />{'新建接口 '}
          </Button>,
        ]}

        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>,
        ) => {
          const res: any = await getAllUserInterfaceInfoDetailByPageUsingPOST({
            ...params,
          });

          if (res?.data) {
            return {
              data: res.data.records || [],
              success: true,
              total: res.data.total || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              {/*{<FormattedMessage id="pages.searchTable.chosen" defaultMessage="" />{' '}
                <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
                &nbsp;&nbsp;
                <span>
                <FormattedMessage
                id="pages.searchTable.totalServiceCalls"
                defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
                </span>
              }*/}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {/* <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />*/}
          </Button>
        </FooterToolbar>
      )}
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => {
          return handleAdd(values);
        }}
        visible={createModalOpen}
      />
      ;
    </PageContainer>
  );
};

export default TableList;
