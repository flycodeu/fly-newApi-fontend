import { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table/lib';
import { Modal } from 'antd';
import React from 'react';


export type Props = {
  columns: ProColumns<API.UserVO>[];
  onCancel: () => void;
  onSubmit: (values: API.UserVO) => Promise<boolean>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;
  return (
    <Modal visible={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default CreateModal;
