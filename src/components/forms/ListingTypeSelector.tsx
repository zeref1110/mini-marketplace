import {
  Tag,
  Layers3,
  Car,
  Home,
} from "lucide-react";

const listingTypes = [
  { icon: Tag, label: "Item for sale" },
  { icon: Layers3, label: "Create multiple listings" },
  { icon: Car, label: "Vehicle for sale" },
  { icon: Home, label: "Home for sale/rent" },
];

export default function ListingTypeSelector() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8">
        Choose a listing type
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {listingTypes.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center border rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer bg-white"
          >
            <Icon className="w-8 h-8 text-[#1877F2] mb-2" />
            <span className="font-medium text-center">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
