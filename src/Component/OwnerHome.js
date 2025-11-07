import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../apiPoint";

export default function OwnerHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myProperties, setMyProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [listing, setListing] = useState(true);

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
        // const bookingRes = await axios.get(
        //   `${API_URL}/api/bookings/owner/${stored._id}`
        // );
        // console.log("Bookings for owner:", bookingRes.data);
        // setBookings(bookingRes.data);
      } catch (err) {
        console.error("❌ Error loading owner data:", err);
      }
    };

    fetchData();
  }, []);

  function run() {
    const data = myProperties.filter((prop) => prop.bookedBy !== null);
    setListing(false);
    setBookings(data);
  }
  return (
    <div className="container py-5 mt-14">
      <h2 className="mb-3 text-center text-3xl font-bold">
        Welcome, {user?.name}
      </h2>

      <Link to="/owner/upload" className="btn btn-warning mb-4">
        + Upload New Property
      </Link>
      <button className="btn btn-warning mb-4 ml-5" onClick={run}>
        Booking Requests
      </button>

      <button
        className="btn btn-warning mb-4 ml-5"
        onClick={() => setListing(true)}
      >
        Listing Properties
      </button>

      <div className="row">
        {myProperties.length === 0 ? (
          <p>No properties yet.</p>
        ) : listing ? (
          myProperties?.map((prop) => {
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
                    {prop.booked ? (
                      <div className="alert alert-danger mt-2">❌ Booked</div>
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
        ) : (
          bookings?.map((prop) => {
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
                    <div className="alert alert-success mt-2">
                      ✅ <strong>Booked</strong>
                      <br />
                      Student: {prop.bookedBy?.name || "N/A"} <br />
                      Email: {prop.bookedBy?.email || "N/A"} <br />
                      Phone: {prop.bookedBy?.number || "N/A"}
                    </div>

                    {/* {booking ? (
                      
                    ) : (
                      <div className="alert alert-warning mt-2">
                        🕒 Available
                      </div>
                    )} */}
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
