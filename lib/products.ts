import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select(`
      *,
      product_images (
        url,
        is_primary
      )
    `);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
