"use client";

import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Rizky Pratama",
    image: "/images/users/user1.jpg",
    review:
      "Kualitas bahan sangat nyaman dipakai dan desainnya minimalis. Cocok banget buat daily outfit.",
  },
  {
    id: 2,
    name: "Andi Saputra",
    image: "/images/users/user2.jpg",
    review:
      "Oversize t-shirt nya enak dipakai dan cuttingnya bagus. Pasti bakal beli lagi.",
  },
  {
    id: 3,
    name: "Dewi Lestari",
    image: "/images/users/user3.jpg",
    review: "Brand lokal tapi kualitasnya terasa premium. Packaging juga rapi.",
  },
];

export default function ReviewSection() {
  return (
    <section className="px-6 md:px-16 py-20 text-black bg-white">
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-3">
          Real reviews from people who love our products
        </p>
      </div>

      {/* REVIEW GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* USER */}
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={review.image}
                alt={review.name}
                width={50}
                height={50}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-sm">{review.name}</h4>

                {/* STARS */}
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
            </div>

            {/* REVIEW TEXT */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
