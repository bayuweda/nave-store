export default function ProductFilter({
  category,
  setCategory,
  size,
  setSize,
}: any) {
  const categories = ["All", "T-Shirt", "Hoodie", "Casual"];
  const sizes = ["All", "S", "M", "L", "XL"];

  return (
    <div className="space-y-10">
      {/* CATEGORY */}
      <div>
        <h3 className="font-semibold mb-4">Category</h3>

        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-left text-sm transition
              ${
                category === cat
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <h3 className="font-semibold mb-4">Size</h3>

        <div className="flex gap-2 flex-wrap">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`border px-3 py-1 text-sm rounded transition
              ${size === s ? "bg-black text-white" : "hover:bg-gray-100"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h3 className="font-semibold mb-4">Price</h3>

        <input type="range" min="100000" max="500000" className="w-full" />

        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>100k</span>
          <span>500k</span>
        </div>
      </div>
    </div>
  );
}
