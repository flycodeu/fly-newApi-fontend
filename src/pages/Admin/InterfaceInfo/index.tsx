import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  getInterfaceInfoPageUsingPOST,
  offLineInterfaceInfoUsingPOST,
  onLineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/services/fly/interfaceController';
import CreateModal from '@/pages/Admin/InterfaceInfo/components/CreateModal';
import UpdateModal from '@/pages/Admin/InterfaceInfo/components/UpdateModal';
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
  const handleAdd = async (fields: API.InterfaceInfoNew) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addInterfaceInfoUsingPOST({
        ...fields,
        token: token as string,
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
  const handleUpdate = async (fields: API.InterfaceInfoNew) => {
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
  const handleRemove = async (record: API.InterfaceInfoNew) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
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
   *  发布接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await onLineInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败,' + error.message);
      return false;
    }
  };

  /**
   * 下线
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('正在下线');
    if (!record) return true;
    try {
      await offLineInterfaceInfoUsingPOST({
        id: record.id,
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('下线失败,' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfoNew>[] = [
      {
        title: 'ID',
        dataIndex: 'id',
        valueType: 'index',
        ellipsis: true,
      },
      {
        title: '接口名称',
        dataIndex: 'name',
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
        title: '接口地址',
        dataIndex: 'url',
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
        title: '端口',
        dataIndex: 'port',
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
        title: 'IP地址',
        dataIndex: 'ipaddress',
        valueType: 'text',
        initialValue: 'localhost',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
      {
        title: '接口描述',
        dataIndex: 'description',
        valueType: 'textarea',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },

      {
        title: '调用次数',
        dataIndex: 'invokeCount',
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
      title: '接口单价',
      dataIndex: 'price',
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
      title: '接口头像',
      dataIndex: 'avatarUrl',
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
        title: '请求方法',
        dataIndex: 'method',
        valueEnum: {
          post: {
            text: 'post',
          },
          get: {
            text: 'get',
          },
          delete: {
            text: 'delete',
          },
          put: {
            text: 'put',
          },
        },
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
      {
        title: '请求头',
        dataIndex: 'requestHeader',
        valueType: 'textarea',
        // formItemProps: {
        //   rules: [
        //     {
        //       required: true,
        //     },
        //   ],
        // },
      },

      {
        title: '响应头',
        dataIndex: 'responseHeader',
        valueType: 'textarea',
        // formItemProps: {
        //   rules: [
        //     {
        //       required: true,
        //     },
        //   ],
        // },
      },
      {
        title: '状态',
        dataIndex: 'status',
        hideInForm: true,
        valueEnum: {
          0: {
            text: '关闭',
            status: 'Error',
          },
          1: {
            text: '开启',
            status: 'Processing',
          },
          2:{
            text:'审核',
            status:'error'
          }
        },
      },
      {
        title: '请求参数',
        dataIndex: 'requestParams',
        valueType: 'textarea',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
        hideInForm: true,
      },

    {
      title: 'SDK路径',
      dataIndex: 'sdkPath',
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
      title: 'SDK接口方法名',
      dataIndex: 'methodName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
      // {
      //   title: '更新时间',
      //   dataIndex: 'updateTime',
      //   valueType: 'dateTime',
      //   hideInForm: true,
      // },
      /*   {
                 title: '是否删除',
                 dataIndex: 'isDeleted',
                 hideInForm: true,
                 valueEnum: {
                   0: {
                     text: '删除',
                     status: 'Danger',
                   },
                   1: {
                     text: '不删除',
                     status: 'Default',
                   },
                 },
               },*/
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
          </a>,
          record.status === 0 ? <a
            key="config"
            onClick={() => {
              handleOnline(record);
            }}
          >
            发布
          </a> : null,
          record.status === 1 ? <a
            key="danger"
            onClick={() => {
              handleOffline(record);
            }}
          >
            下线
          </a> : null,

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
          filter: Record<string, (string | number)[] | null>,
        ) => {
          const res: any = await getInterfaceInfoPageUsingPOST({
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
              await handleRemove(selectedRowsState );
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
