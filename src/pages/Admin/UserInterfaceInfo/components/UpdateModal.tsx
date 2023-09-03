import { ProFormInstance } from '@ant-design/pro-form';
import { ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table/lib';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';


export type Props = {
  values: API.InterfaceInfoNew;
  columns: ProColumns<API.UserInterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.UserInterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default UpdateModal;
