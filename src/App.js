import { useState, useEffect, useCallback } from "react";
import Swal from 'sweetalert2';
import Header from "./components/Header";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

function App() {
    const [items, setItems] = useState([]);

    // Load items from localStorage when the component mounts
    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    // Update localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    // Add a new item to the list
    const addItem = useCallback((newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }, []);

    // Remove an item by its id
    const removeItem = useCallback((id) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    }, []);

    // Toggle the packed status of an item
    const togglePacked = useCallback((id) => {
        setItems((prevItems) =>
            prevItems.map(item =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }, []);

    // Clear all items after confirmation
    const clearAllItems = useCallback(() => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete all items?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete them all!'
        }).then((result) => {
            if (result.isConfirmed) {
                setItems([]);
                localStorage.removeItem('items');
                Swal.fire({
                    title: 'All items deleted!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }, []);

    return (
        <main className="app">
            <Header />
            <Form onAddItem={addItem} />
            <PackingList
                items={items}
                onDelete={removeItem}
                onTogglePacked={togglePacked}
                onClearAll={clearAllItems}
            />
            <Stats items={items} />
        </main>
    );
}

export default App;
