import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const pricingPlans = [
    {
        name: "Basic",
        price: 10,
        features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
        name: "Standard",
        price: 20,
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
        name: "Premium",
        price: 30,
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
];

const Pricing = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Pricing Plans</h1>
            <div className="row justify-content-center">
                {pricingPlans.map((plan, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card text-center shadow-lg mb-4">
                            <div className="card-body">
                                <h2 className="card-title fw-bold">{plan.name}</h2>
                                <h3 className="text-success">${plan.price}/month</h3>
                                <ul className="list-group list-group-flush mb-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="list-group-item">
                                            ✅ {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button className="btn btn-primary w-100">Choose Plan</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
