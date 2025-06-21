import React from 'react';
import { Download } from 'lucide-react';

const ExportButton = () => {
    const handleExport = () => {
        alert('Exporting orders to CSV... (mock)');
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow"
        >
            <Download size={18} />
            Export CSV
        </button>
    );
};

export default ExportButton;
