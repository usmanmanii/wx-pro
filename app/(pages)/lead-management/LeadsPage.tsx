"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { ITEMS_PER_PAGE, LEADS } from "@/app/constant";

const LeadsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";
  const sortKey = (searchParams.get("sort") || "name") as
    | "name"
    | "status"
    | "country";
  const sortOrder = (searchParams.get("order") || "asc") as "asc" | "desc";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const updateQuery = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    router.push(`?${newParams.toString()}`);
  };

  const filteredLeads = useMemo(() => {
    return LEADS.filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) &&
        (!statusFilter || lead.status === statusFilter)
    ).sort((a, b) => {
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [search, statusFilter, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key: typeof sortKey) => {
    const isSame = sortKey === key;
    updateQuery({
      sort: key,
      order: isSame && sortOrder === "asc" ? "desc" : "asc",
      page: "1",
    });
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">almà</div>
        <nav>
          <ul className="top-items">
            <li className="active">Leads</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className="admin">
          <div className="avatar">A</div>
          <span>Admin</span>
        </div>
      </aside>

      <main className="main">
        <h1>Leads</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search"
            defaultValue={search}
            onChange={(e) => updateQuery({ search: e.target.value, page: "1" })}
          />
          <select
            value={statusFilter}
            onChange={(e) => updateQuery({ status: e.target.value, page: "1" })}
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Reached Out">Reached Out</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Name{" "}
                {sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Submitted</th>
              <th onClick={() => handleSort("status")}>
                Status{" "}
                {sortKey === "status" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => handleSort("country")}>
                Country{" "}
                {sortKey === "country" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.map((lead, idx) => (
              <tr key={idx}>
                <td>{lead.name}</td>
                <td>{lead.submitted}</td>
                <td>{lead.status}</td>
                <td>{lead.country}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {/* <span className="disabled">‹</span>
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>›</span> */}

          <span onClick={() => updateQuery({ page: currentPage > 1 ? String(currentPage - 1) : '1' })}>
            ‹
          </span>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              //   disabled={i + 1 === currentPage}
              className={
                " pagination-button " + (i + 1 === currentPage ? " active" : "")
              }
              onClick={() => updateQuery({ page: String(i + 1) })}
            >
              {i + 1}
            </span>
          ))}
          <span onClick={() => updateQuery({ page: currentPage < totalPages ? String(currentPage + 1) : String(currentPage) })}>
            ›
          </span>
        </div>
      </main>
    </div>
  );
};

export default LeadsPage;

/* Copywriter:
Your Name – M Usman
Email: usmenqurashi@gmail.com 
*/