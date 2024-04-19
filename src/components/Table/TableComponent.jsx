import { Table } from 'antd';
import React, { useState } from 'react';
import Loading from '../LoadingComponent/Loading';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', columns = [], data = [], isPending = false, handleDeleteMany } = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setRowSelectedKey(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteProducts = () => {
        handleDeleteMany(rowSelectedKey)
    }

    return (
        <Loading isPending={isPending}>
            {rowSelectedKey.length > 0 && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        width: '100px',
                        height: '30px',
                        alignItems: 'center',
                        cursor: 'pointer',
                        border: '0.01em solid grey',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}
                    onClick={handleDeleteProducts}
                >
                    Xóa đã chọn
                </div>
            )}

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </Loading>

    );
}

export default TableComponent;