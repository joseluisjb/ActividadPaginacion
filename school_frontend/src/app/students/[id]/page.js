"use client";

import { use, useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StudentDetail({ params }) {
    const resolvedParams = use(params);

    const router = useRouter();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = "http://localhost:8000";

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const url = `${API_BASE_URL}/students/${resolvedParams.id}/`;
                const res = await fetch(url);
                const data = await res.json();
                setStudent(data);
            } catch (error) {
                console.error("Error fetching student:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [resolvedParams.id]);

    if (loading) {
        return <div className="p-6">Cargando...</div>;
    }

    if (!student) {
        return <div className="p-6">Estudiante no encontrado</div>;
    }

    return (
        <Card className="w-150 mx-auto mt-4">
            <CardHeader>
                <CardTitle>Estudiante #{resolvedParams.id}</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <p><strong>Nombre:</strong> {student.full_name}</p>
                    <p><strong>Código:</strong> {student.code}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                </div>
                <Button className="mt-2" variant="outline" onClick={() => router.push("/")}>
                    Regresar
                </Button>
            </CardContent>
        </Card>
    );
}