import { useState, useEffect } from "react";

const VISITOR_ID_KEY = "cp_visitor_id";

/**
 * Generates and persists an anonymous visitor ID in localStorage.
 * Used for tracking anonymous likes without requiring authentication.
 */
export const useVisitorId = (): string | null => {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    
    if (!id) {
      // Generate a simple unique ID
      id = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    
    setVisitorId(id);
  }, []);

  return visitorId;
};

/**
 * Get visitor ID synchronously (for non-hook contexts)
 */
export const getVisitorId = (): string => {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  
  return id;
};
