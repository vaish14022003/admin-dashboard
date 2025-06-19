// src/components/FeatureIcons.tsx
import { Lock, Package, UtensilsCrossed, Users } from 'lucide-react';

const FeatureIcons = () => {
    return (
        <div className="bg-white shadow-inner py-6 px-4 flex justify-center gap-6 text-sm text-gray-700 border-t">
            <div className="flex flex-col items-center gap-1">
                <Lock className="h-6 w-6 text-blue-600" />
                <span>Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <Package className="h-6 w-6 text-green-600" />
                <span>Orders</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                <span>Restaurant</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <Users className="h-6 w-6 text-purple-600" />
                <span>Users</span>
            </div>
        </div>
    );
};

export default FeatureIcons;
