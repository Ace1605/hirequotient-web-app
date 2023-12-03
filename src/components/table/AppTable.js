import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Edit } from "../svg/Edit";
import { Trash } from "../svg/Trash";
import { Bin } from "../svg/Bin";
import styled from "styled-components";
import Modal from "react-modal/lib/components/Modal";
import { Close } from "../svg/Close";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import DeleteAllModal from "../modals/DeleteAllModal";

const Wrapper = styled.div`
  position: relative;

  .css-1tbggly {
    background-color: #f7f7f7;
    z-index: 0;
  }
  .css-1atu56z-MuiPaper-root .css-r58cto-MuiTableRow-root {
    background-color: #f7f7f7 !important;
  }
  .css-1atu56z-MuiPaper-root {
    border-radius: 0.8rem;
  }
`;

const BtnDiv = styled.div`
  position: absolute;
  top: 1.8rem;
  right: 1rem;
  z-index: 10;

  .close-delete {
    cursor: pointer;
    margin-right: 1.4rem;
  }
`;

//data must be stable reference (useState, useMemo, useQuery, defined outside of component, etc.)

export default function AppTable({ data, getChange }) {
  const [openDelete, setOpenDelete] = useState(false);
  const onOpenDeleteModal = () => setOpenDelete(true);
  const onCloseDeleteModal = () => setOpenDelete(false);
  const [openClear, setOpenClear] = useState(false);
  const onOpenClearModal = () => setOpenClear(true);
  const onCloseClearModal = () => setOpenClear(false);
  const [single, setSingle] = useState({});
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [numOfElements, setNumOfElements] = useState(0);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorFn: (row) => row.email, //alternate way
        id: "email", //id required if you use accessorFn instead of accessorKey
        header: "Email",
        Header: () => <i>Email</i>, //optional custom header render
      },
      {
        accessorFn: (row) => row.role, //alternate way
        id: "role", //id required if you use accessorFn instead of accessorKey
        header: "Role",
        Header: () => <i>Role</i>, //optional custom header render
      },
      {
        accessorKey: "action", //simple recommended way to define a column
        header: "Action",
        muiTableHeadCellProps: { sx: { color: "red" } }, //optional custom props
        Cell: ({ cell }) => (
          <span className="flex items-center gap-2">
            <span
              className="edit cursor-pointer hover:scale-90"
              title="edit"
              onClick={() => {
                onOpenModal();
                setSingle(cell.row.original);
              }}
            >
              {" "}
              <Edit />
            </span>
            <span
              className="delete cursor-pointer hover:scale-90"
              title="delete"
              onClick={() => {
                onOpenDeleteModal();
              }}
            >
              <Trash />
            </span>
          </span>
        ), //optional custom cell render
      },
    ],
    []
  );

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  useEffect(() => {
    setRowSelection({});
  }, [getChange]);

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: true,
    muiPaginationProps: {
      showFirstButton: true,
      showLastButton: true,
    },
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    paginationDisplayMode: "pages",
    enableColumnOrdering: false, //enable some features
    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <span
        className={
          Object.keys(rowSelection).length > 0
            ? "delete cursor-pointer hover:scale-90"
            : "delete cursor-not-allowed"
        }
        onClick={() => {
          if (Object.keys(rowSelection).length > 0) {
            onOpenClearModal();
            console.log(table);
            setNumOfElements(Object.keys(rowSelection).length);
          }
        }}
      >
        <Bin />
      </span>
    ),
    onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
    state: { rowSelection }, //manage your own state, pass it back to the table (optional)
  });

  const someEventHandler = () => {
    //read the table state during an event from the table instance
    console.log(table.getState().sorting);
  };

  const deleteStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "1.2rem",
      paddingBottom: "1rem",
      minWidth: "20%",
      maxWidth: "90%",
    },
    overlay: {
      backgroundColor: "rgb(24 24 24 / 10%)",
      overflowY: "auto",
    },
  };

  const ticketStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "1.2rem",
      paddingBottom: "1rem",
      minWidth: "30%",
      maxWidth: "90%",
      zIndex: "1000",
    },
    overlay: {
      backgroundColor: "rgb(24 24 24 / 10%)",
      overflowY: "auto",
    },
  };

  return (
    <Wrapper>
      <Modal
        isOpen={openDelete}
        onRequestClose={onCloseDeleteModal}
        style={deleteStyles}
        contentLabel="Clear Modal"
      >
        <BtnDiv className="cursor-pointer" onClick={onCloseDeleteModal}>
          <Close />
        </BtnDiv>
        <DeleteModal
          closeModal={onCloseDeleteModal}
          details={data}
          current={single}
          getChange={getChange}
        />
      </Modal>
      <Modal
        isOpen={openClear}
        onRequestClose={onCloseClearModal}
        style={deleteStyles}
        contentLabel="Delete Modal"
      >
        <BtnDiv className="cursor-pointer" onClick={onCloseClearModal}>
          <Close />
        </BtnDiv>
        <DeleteAllModal
          closeModal={onCloseClearModal}
          details={data}
          getChange={getChange}
          num={numOfElements}
        />
      </Modal>
      <Modal
        isOpen={open}
        onRequestClose={onCloseModal}
        style={ticketStyles}
        contentLabel="Edit Modal"
      >
        <BtnDiv className="cursor-pointer" onClick={onCloseModal}>
          <Close />
        </BtnDiv>
        <EditModal
          closeModal={onCloseModal}
          details={data}
          current={single}
          getChange={getChange}
        />
      </Modal>
      <MaterialReactTable table={table} />
    </Wrapper> //other more lightweight MRT sub components also available
  );
}
