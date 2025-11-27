
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
//Imports nuevos
import { useSearchParams } from 'next/navigation';
import { PruebaPagination } from "@/components/ui/pruebapagination";
import { PruebaDialog } from "@/components/ui/pruebadialog";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [ordering, setOrdering] = useState("full_name")
  const [totalCount, setTotalCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  //Obtenemos el número de página del frontend
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = 5;
  const totalPages = Math.ceil(totalCount / pageSize);

  const loadStudents = async () => {
    console.log("Haciendo búsqueda de... ", query)
    const url = `${API_BASE_URL}/students/?search=${query}&ordering=${ordering}&page=${currentPage}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  const orderingClickHandler = (button) => {
    if (button === 'name_button') {
      if (ordering === 'full_name') setOrdering('-full_name')
      else setOrdering('full_name')
    } else {
      if (ordering === 'code') setOrdering('-code')
      else setOrdering('code')
    }
  }

  useEffect(() => {
    loadStudents().then((data) => {
      setStudents(data.results);
      setTotalCount(data.count);
    });
  }, [query, ordering, currentPage]);

  const onSubmit = async (data) => {
    console.log("Submitting data: ", data);
    const response = await fetch(`${API_BASE_URL}/students/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    )
    if (response.ok) {
      const newStudent = await response.json();
      loadStudents().then((data) => {
        setStudents(data.results);
        setTotalCount(data.count);
      });
      // setStudents([newStudent,...students]);
      toast.success("Estudiante agregado con éxito");
      setDialogOpen(false);
    }
    else {
      const errorData = await response.json();
      console.error("Error adding student: ", errorData);

      let errorMessage = "";

      for (const key in errorData) {
        errorMessage += `${key}: ${errorData[key]}\n`;
      }

      toast.error("Error al agregar el estudiante", {
        description: errorMessage,
      });
    }
  }

  function regresar(){
    router.push(`/students/`);
  }

  return (
    <Card className="w-150 mx-auto mt-4">
      <CardHeader>
        <CardTitle>Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button variant="outline" onClick={() => { orderingClickHandler("name_button") }}>
            {ordering === 'full_name' ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </Button>
          <Button variant="outline" onClick={() => { orderingClickHandler("code_button") }}>
            {ordering === 'code' ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </Button>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="p-4 h-60 overflow-y-auto">
          <ul>
            {students.map((student) => (
              <li key={student.code} className="text-md font-medium my-2 flex flex-row justify-between" title={student.email}>
                <div>
                  {student.full_name}

                </div>
                <div>
                  {student.code}
                </div>
                <div>
                  <Button variant="outline" onClick={() => router.push(`/students/${student.id}`)}>Detalles
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <PruebaDialog
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />

      </CardContent>
      <PruebaPagination currentPage={currentPage} totalPages={totalPages} />
    </Card>

  );
}
