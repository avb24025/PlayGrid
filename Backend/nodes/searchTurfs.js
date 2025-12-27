import Turf from "../model/Turf.model.js";

export async function searchTurfs(state) {
  try {
    const {
      location,
      district,
      state: stateName,
      sport,
      turfName,
      size,
      maxPrice,
      startTime,
      endTime,
    } = state.filters;

    // 1️⃣ Build dynamic MongoDB query
    const query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (district) {
      query.district = { $regex: district, $options: "i" };
    }

    if (stateName) {
      query.state = { $regex: stateName, $options: "i" };
    }

    if (sport) {
      query.sport = sport.toLowerCase();
    }

    if (turfName) {
      query.name = { $regex: turfName, $options: "i" };
    }

    if (size) {
      query.size = size;
    }

    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    // Optional: time window filtering
    if (startTime && endTime) {
      query.openingTime = { $lte: startTime };
      query.closingTime = { $gte: endTime };
    }

    // 2️⃣ Query DB
    const turfs = await Turf.find(query).limit(10);

    if (turfs.length === 0) {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            role: "assistant",
            content:
              "No turfs found matching your criteria. Try changing location, sport, or price.",
          },
        ],
      };
    }

    // 3️⃣ Store results in state
    return {
      ...state,
      turfs,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content:
            `I found these turfs:\n` +
            turfs
              .map(
                (t, i) =>
                  `${i + 1}. ${t.name} (${t.location}, ₹${t.price})`
              )
              .join("\n") +
            `\n\nPlease select one.`,
        },
      ],
    };
  } catch (err) {
    console.error("searchTurfs error:", err);

    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content:
            "Something went wrong while searching for turfs. Please try again.",
        },
      ],
    };
  }
}
