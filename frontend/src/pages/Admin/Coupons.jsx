import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Trash2, X } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
} from "../../api/couponsAPI";

import "../../styles/coupons.css";

export default function Coupons() {
  const emptyForm = {
    id: null,
    code: "",
    discount_type: "",
    discount_value: "",
    min_cart_value: "",
    first_time_user: false,
    usage_limit: "",
    valid_from: "",
    valid_to: "",
    status: true,
  };

  const [form, setForm] = useState(emptyForm);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  loadCoupons();
}, []);

async function loadCoupons() {
  setLoading(true);
  try {
    const data = await fetchCoupons();

    console.log("API RESPONSE:", data);  // 👈 Yaha print hoga

    if (Array.isArray(data)) {
      setCoupons(data);
    } else if (Array.isArray(data?.results)) {
      setCoupons(data.results);
    } else if (Array.isArray(data?.coupons)) {
      setCoupons(data.coupons);
    } else {
      setCoupons([]);
    }

  } catch (err) {
    console.error(err);
    alert("Failed to load coupons.");
  } finally {
    setLoading(false);
  }
}

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === "first_time_user") {
      setForm((prev) => ({ ...prev, first_time_user: value === "true" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.code || !form.discount_type) {
      alert("Code and Discount Type are required.");
      return false;
    }

    const dv = parseFloat(form.discount_value || 0);
    if (isNaN(dv) || dv <= 0) {
      alert("Discount value must be > 0.");
      return false;
    }

    if (form.valid_from && form.valid_to) {
      if (new Date(form.valid_to) < new Date(form.valid_from)) {
        alert("'Valid To' cannot be before 'Valid From'.");
        return false;
      }
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    try {
      const payload = {
        code: form.code,
        discount_type: form.discount_type,
        discount_value: form.discount_value,
        min_cart_value: form.min_cart_value || null,
        first_time_user: form.first_time_user,
        usage_limit: form.usage_limit || null,
        valid_from: form.valid_from || null,
        valid_to: form.valid_to || null,
      };

      if (form.id) {
        const updated = await updateCoupon(form.id, payload);
        setCoupons((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        alert("Coupon updated.");
      } else {
        const created = await createCoupon(payload);
        setCoupons((prev) => [created, ...prev]);
        alert("Coupon created.");
      }

      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      alert("Save failed. Check console.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(c) {
    setForm({
      id: c.id,
      code: c.code || "",
      discount_type: c.discount_type || "",
      discount_value: c.discount_value || "",
      min_cart_value: c.min_cart_value || "",
      first_time_user: !!c.first_time_user,
      usage_limit: c.usage_limit || "",
      valid_from: c.valid_from || "",
      valid_to: c.valid_to || "",
      status: !!c.status,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await deleteCoupon(id);
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      alert("Deleted.");
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  }

  async function handleToggleStatus(id) {
    try {
      const result = await toggleCouponStatus(id);
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, status: result.status } : c
        )
      );
    } catch (err) {
      console.error(err);
      alert("Toggle failed.");
    }
  }

  return (
    <div className="coupons-page d-flex">
      <Sidebar />
      <div className="content-area flex-grow-1">
        <Header />

        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4>{form.id ? "Edit Coupon" : "Create Coupon"}</h4>
            <div>
              <Link
                to="/admin/coupons"
                className="btn btn-sm btn-outline-secondary me-2"
              >
                <RefreshCw size={15} /> Refresh
              </Link>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setForm(emptyForm)}
              >
                <X size={15} /> Clear
              </button>
            </div>
          </div>

          {/* FORM */}
          <form className="row g-3 mt-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label className="form-label">Code *</label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Discount Type *</label>
              <select
                name="discount_type"
                value={form.discount_type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select</option>
                <option value="Percentage">Percentage</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Discount Value *</label>
              <input
                name="discount_value"
                type="number"
                step="0.01"
                value={form.discount_value}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Min Cart Value</label>
              <input
                name="min_cart_value"
                type="number"
                step="0.01"
                value={form.min_cart_value}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">First Time User</label>
              <select
                name="first_time_user"
                value={form.first_time_user ? "true" : "false"}
                onChange={handleChange}
                className="form-select"
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Usage Limit</label>
              <input
                name="usage_limit"
                type="number"
                value={form.usage_limit}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Valid From</label>
              <input
                name="valid_from"
                type="date"
                value={form.valid_from || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Valid To</label>
              <input
                name="valid_to"
                type="date"
                value={form.valid_to || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-12 text-end">
              <button className="btn btn-primary" disabled={saving}>
                {saving
                  ? form.id
                    ? "Updating..."
                    : "Creating..."
                  : form.id
                  ? "Update Coupon"
                  : "Create Coupon"}
              </button>
            </div>
          </form>

          <hr className="my-4" />

          {/* TABLE */}
          <h5>All Coupons</h5>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>First Time</th>
                    <th>Min Cart</th>
                    <th>Usage</th>
                    <th>Valid From</th>
                    <th>Valid To</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {coupons.length === 0 ? (
                    <tr>
                      <td colSpan="10">No coupons found.</td>
                    </tr>
                  ) : (
                    coupons.map((c) => (
                      <tr key={c.id}>
                        <td>{c.code}</td>
                        <td>{c.discount_type}</td>
                        <td>{c.discount_value}</td>
                        <td>{c.first_time_user ? "Yes" : "No"}</td>
                        <td>{c.min_cart_value ?? "-"}</td>
                        <td>
                          {c.usage_count ?? 0}/{c.usage_limit ?? "-"}
                        </td>
                        <td>{c.valid_from ?? "-"}</td>
                        <td>{c.valid_to ?? "-"}</td>

                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={!!c.status}
                              onChange={() => handleToggleStatus(c.id)}
                            />
                            <span className="slider"></span>
                          </label>
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(c)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(c.id)}
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
