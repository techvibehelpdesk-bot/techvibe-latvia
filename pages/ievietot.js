"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function IevietotSludinajumu() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { title, description, price, city, category } = formData;

    const { error } = await supabase.from("sludinajumi").insert([
      {
        title,
        description,
        price: Number(price),
        city,
        category,
        status: "publicēts",
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMsg("Radās kļūda, mēģini vēlreiz.");
      return;
    }

    setSuccessMsg("Sludinājums veiksmīgi publicēts!");
    setFormData({
      title: "",
      description: "",
      price: "",
      city: "",
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Virsraksts"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Apraksts"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Cena"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        placeholder="Pilsēta"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Izvēlies kategoriju</option>
        <option value="telefoni">Telefoni</option>
        <option value="datori">Datori</option>
        <option value="auto">Auto</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Publicēju..." : "Publicēt sludinājumu"}
      </button>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </form>
  );
}
