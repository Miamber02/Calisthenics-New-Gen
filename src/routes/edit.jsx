import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import { updateContact, getContact, createContact } from "../contacts";
import { helpHttp } from "../helpers/helpHttp";
import { useState } from "react";

// Acción para crear o actualizar un contacto
export async function action({ request, params }) {
  const formData = await request.formData();
  const contactData = Object.fromEntries(formData);

  if (params.contactId) {
    await updateContact(params.contactId, contactData);
    return redirect(`/contacts/${params.contactId}`);
  } else {
    const newContact = await createContact(contactData);
    return redirect(`/contacts/${newContact.id}`);
  }
}

// Loader: cargar datos del contacto y filtrar entrenadores
export async function loader({ params }) {
  const users = await helpHttp().get("http://localhost:5000/users");
  const contact = params.contactId
    ? await getContact(params.contactId)
    : {};

  // Filtrar los usuarios que tengan el rol "trainer"
  const trainers = users.filter((user) => user.rol === "trainer");

  return { contact, trainers };
}

export default function EditContact() {
  const { contact, trainers } = useLoaderData();
  const navigate = useNavigate();
  const isNewContact = !contact?.id;

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contactData = Object.fromEntries(formData.entries());

    try {
      if (isNewContact) {
        const newContact = await createContact(contactData);
        console.log("Contacto creado con éxito:", newContact);
        navigate(`/contacts/${newContact.id}`);
      } else {
        const updatedContact = await updateContact(contact.id, contactData);
        console.log("Contacto actualizado con éxito:", updatedContact);
        navigate(`/contacts/${updatedContact.id}`);
      }
    } catch (error) {
      console.error("Error creando o actualizando el contacto:", error);
      navigate(`/`);
    }
  };

  return (
    <Form method="post" id="contact-form" onSubmit={handleSubmit}>
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="First name"
          type="text"
          name="name"
          defaultValue={contact?.name || ""}
        />
        <select name="rol" defaultValue={contact?.rol || "user"}>
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
          <option value="admin">Admin</option>
        </select>
      </p>

      {/* Select para asignar un entrenador */}
      <p>
        <label>Assign Trainer</label>
        <select name="trainer_id" defaultValue={contact?.trainer_id || ""}>
          <option value="">-- Select Trainer --</option>
          {trainers.map((trainer) => (
            <option key={trainer.id} value={trainer.id}>
              {trainer.name} (ID: {trainer.id})
            </option>
          ))}
        </select>
      </p>

      <p>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          defaultValue={contact?.password || "12345678"} // Contraseña por defecto
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)} // Alternar estado de mostrar/ocultar
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </p>

      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
