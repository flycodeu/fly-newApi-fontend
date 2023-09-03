import ProDescriptions,{ ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { FooterToolbar,PageContainer } from '@ant-design/pro-layout';
import { ActionType,ProColumns,ProTable } from '@ant-design/pro-table';
import { Button,Drawer,Image,message } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import React,{ useRef,useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  addUserUsingPOST,
  deleteUserUsingPOST,
  listPageUserUsingPOST, listUserVOByPageUsingPOST,
  updateUserUsingPOST,
} from '@/services/fly/userController';
import UpdateModal from '@/pages/Admin/UserInfo/components/UpdateModal';
import CreateModal from '@/pages/Admin/UserInfo/components/CreateModal';
import { PlusOutlined } from '@ant-design/icons';

const UserInfo: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserVO[]>([]);
  const [currentId, setCurrentId] = useState<number>();
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserVO) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPOST({ ...fields });
      hide();
      message.success('创建成功');
      handleModalOpen(false);
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
  const handleUpdate = async (fields: API.UserVO) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateUserUsingPOST({
        id: currentRow.id,
        ...fields,
      });
      hide();

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
  const handleRemove = async (record: API.UserVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteUserUsingPOST({
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
  //  const intl = useIntl();

  const columns: ProColumns<API.UserVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'index',
      ellipsis: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '用户头像',
      dataIndex: 'userAvatar',
      hideInForm: true,
      render: (_, record) => (
        <div>
          <Image src={record.userAvatar} width={50} height={50} />
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '男',
        },
        1: {
          text: '女',
        },
      },
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'text',
      valueEnum: {
        admin: {
          text: '管理员',
          status: 'Processing',
        },
        user: {
          text: '用户',
          status: 'Processing',
        },
      },
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
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
      ],
    },
  ];

  // @ts-ignore          <API.RuleListItem, API.PageParams>
  return (
    <PageContainer>
      <ProTable
        headerTitle="用户"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
              // toolBarRender={() => [
              //   <Button
              //     type="primary"
              //     key="primary"
              //     onClick={() => {
              //       handleModalOpen(true);
              //     }}
              //   >
              //     <PlusOutlined />{' '}
              //     <FormattedMessage id="pages.searchTable.new" defaultMessage="新建用户" />
              //   </Button>,
              // ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, (string | number)[] | null>,
        ) => {
          const res: any = await listUserVOByPageUsingPOST({
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
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
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
            </div>
          }
        >
          <Button
            onClick={async () => {
              //  await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
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
        {currentRow?.userName && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.userName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.userName,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => handleModalOpen(false)}
        onSubmit={(values) => handleAdd(values)}
        visible={createModalOpen}
      />
    </PageContainer>
  );
};

export default UserInfo;
