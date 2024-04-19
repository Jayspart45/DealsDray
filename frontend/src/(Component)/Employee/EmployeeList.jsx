/* eslint-disable no-unused-vars */
import { BACKEND_API } from "@/config/config";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import DataTable from "../utils/DataTable";
import { Container } from "@/(Component)";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "@/context/useUser";

const columns = [
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unique ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p>{row.getValue("_id").slice(0, 8)}</p>;
    },
  },
  {
    accessorKey: "avatar",
    header: ({ column }) => {
      return <Button variant="ghost">Image</Button>;
    },
    cell: ({ row }) => {
      return <p>{row.getValue("avatar").split("/")[7]}</p>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => {
      return <Button variant="ghost">Mobile No</Button>;
    },
  },
  {
    accessorKey: "designation",
    header: ({ column }) => {
      return <Button variant="ghost">Designation</Button>;
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return <Button variant="ghost">Gender</Button>;
    },
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return <Button variant="ghost">Course</Button>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("createdAt")).toLocaleString(
        "en-IN",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }
      );
      return <p>{formattedDate}</p>;
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <Button variant="ghost">Action</Button>;
    },
    cell: ({ row }) => <ButtonComponent row={row.original} />,
  },
];

const ButtonComponent = (row) => {
  const navigate = useNavigate();
  const { setUpdatedData, setTableData } = useUser();
  const handleDelete = async (id) => {
    try {
      const response = await BACKEND_API.post(
        "/api/v1/employee/delete_employee",
        {
          id: id,
        }
      );
      setTableData(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (data) => {
    setUpdatedData(data);
    navigate("/user/updateemployee");
  };
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => handleEdit(row.row)}>Edit</Button>
      <Button onClick={() => handleDelete(row.row._id)}>Delete</Button>
    </div>
  );
};

const EmployeeList = () => {
  const { tableData, setTableData } = useUser();
  const fetchData = async () => {
    const response = await BACKEND_API.get("/api/v1/employee/get_employees");
    setTableData(response.data.data);
  };

  useEffect(() => {
    toast.promise(fetchData, {
      pending: "Fetching in process",
      success: "Fetched Successfully",
      error: "Error while fetching",
    });
  }, []);

  const memoizedTableData = useMemo(() => tableData, [tableData]);

  return (
    <Container className={"w-full min-h-screen"}>
      <h1 className="font-bold text-4xl py-10 text-zinc-700">EmployeeList</h1>
      <DataTable data={memoizedTableData} columns={columns} />
    </Container>
  );
};

export default EmployeeList;
