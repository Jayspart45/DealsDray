/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { BACKEND_API } from "@/config/config";
import { ArrowUpDown } from "lucide-react";
import { toast } from "react-toastify";

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
    cell: ({ row }) => {
      const handleDelete = async (id) => {
        try {
          const response = await BACKEND_API.post(
            "/api/v1/employee/delete_employee",
            {
              id: id,
            }
          );
          toast.success(response.data.message);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex items-center gap-2">
          <Button>Edit</Button>
          <Button onClick={() => handleDelete(row.original._id)}>Delete</Button>
        </div>
      );
    },
  },
];
export default columns;
