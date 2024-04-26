import { Table } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { Excel } from "antd-table-saveas-excel";
import Loading from '../LoadingComponent/Loading';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', columns = [], data = [], isPending = false, handleDeleteMany } = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([]);
    const tableRef = useRef(null);
    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setRowSelectedKey(selectedRowKeys)
        },

    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKey)
    }

    const columnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr;
    }, [columns])
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(columnExport)
            .addDataSource(data, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };

    return (
        <Loading isPending={isPending}>
            {rowSelectedKey.length > 0 && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        width: '120px',
                        height: '30px',
                        alignItems: 'center',
                        cursor: 'pointer',
                        border: '0.01em solid grey',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}
                    onClick={handleDeleteAll}
                >
                    Xóa đã chọn  {rowSelectedKey.length}
                </div>

            )}
            <button onClick={exportExcel} > Export Excel</button>
            <Table
                ref={tableRef}
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