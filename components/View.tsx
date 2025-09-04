"use client";
import { useEffect, useState } from "react";
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

const View = ({ id }: { id: string }) => {
  const [totalViews, setTotalViews] = useState<number>(0);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      const { views } = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUP_VIEWS_QUERY, { id });

      setTotalViews(views);

      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit();
    };

    fetchAndIncrementViews();
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;