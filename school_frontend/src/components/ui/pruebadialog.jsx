import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function PruebaDialog( {register, handleSubmit, onSubmit, open, onOpenChange} ) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button onClick={() => onOpenChange(true)}>Agregar Estudiante</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Estudiante</DialogTitle>
                    <DialogDescription>
                        Ingrese los datos requeridos.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <div>
                        <Field className="mt-4">
                            <FieldLabel htmlFor="full_name" >Nombre completo</FieldLabel>
                            <Input id="full_name" placeholder="Ingresa el nombre" {...register("full_name", { required: true })}></Input>
                        </Field>
                        <Field className="mt-4">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" placeholder="Ingresa el email" {...register("email", { required: true })}></Input>
                        </Field>
                        <Field className="mt-4">
                            <FieldLabel htmlFor="code">Código</FieldLabel>
                            <Input id="code" placeholder="Ingresa el código" {...register("code", { required: true })}></Input>
                        </Field>
                        <Button className="my-2" onClick={handleSubmit(onSubmit)}>
                            Agregar estudiante
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}