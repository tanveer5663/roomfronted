import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../apiPoint";

export default function OwnerHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myProperties, setMyProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) {
      navigate("/OwnerStudentLogin");
      return;
    }

    if (stored.role !== "owner") {
      alert("Access denied: owners only");
      navigate("/");
      return;
    }

    setUser(stored);

    const fetchData = async () => {
      try {
        // ✅ Fetch properties owned by this owner
        const propRes = await axios.get(
          `${API_URL}/api/properties/owner/${stored._id}`
        );
        setMyProperties(propRes.data);

        // ✅ Fetch bookings for this owner's properties
        const bookingRes = await axios.get(
          `${API_URL}/api/bookings/owner/${stored._id}`
        );
        setBookings(bookingRes.data);
      } catch (err) {
        console.error("❌ Error loading owner data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-5 mt-14">
      <h2 className="mb-3">Welcome, {user?.name}</h2>

      <Link to="/owner/upload" className="btn btn-warning mb-4">
        + Upload New Property
      </Link>

      <div className="row">
        {myProperties.length === 0 ? (
          <p>No properties yet.</p>
        ) : (
          myProperties?.map((prop) => {
            const booking = bookings.find(
              (b) => b.propertyId?._id === prop._id
            );
            console.log(booking);

            return (
              <div className="col-md-4 mb-3" key={prop._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={prop.image}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                    alt={prop.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prop.name}</h5>
                    <p className="card-text">
                      ₹{prop.rent} · {prop.type}
                    </p>
                    <p className="card-text small text-muted">
                      {prop.location}
                    </p>

                    {booking ? (
                      <div className="alert alert-success mt-2">
                        ✅ <strong>Booked</strong>
                        <br />
                        Student: {booking.userId?.name || "N/A"} <br />
                        Email: {booking.userId?.email || "N/A"}
                      </div>
                    ) : (
                      <div className="alert alert-warning mt-2">
                        🕒 Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}