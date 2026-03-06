import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { city, month, year, active_listings, closed_sales } = body;

    // Basic validation
    if (!city || !month || !year || active_listings == null || closed_sales == null) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }
    if (month < 1 || month > 12) {
      return Response.json({ error: "Month must be between 1 and 12." }, { status: 400 });
    }
    if (active_listings < 0 || closed_sales < 0) {
      return Response.json({ error: "Values cannot be negative." }, { status: 400 });
    }

    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from("market_data")
      .upsert(
        { city, month, year, active_listings, closed_sales },
        { onConflict: "city,month,year" }
      )
      .select()
      .single();

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) return Response.json({ error: "ID required." }, { status: 400 });

    const admin = supabaseAdmin();
    const { error } = await admin.from("market_data").delete().eq("id", id);
    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
