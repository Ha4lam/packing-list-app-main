import { useState } from "react";

export default function Form({ onAddItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!description.trim()) return;

        // Create a new item
        const newItem = {
            id: Date.now(),
            description,
            quantity,
            packed: false,
        };

        // Pass the new item to the parent component
        onAddItem(newItem);

        // Reset the form inputs
        setDescription("");
        setQuantity(1);
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
            >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                id="description"
                name="description"
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}
