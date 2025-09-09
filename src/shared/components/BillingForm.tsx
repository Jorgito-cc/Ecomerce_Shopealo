import React from 'react';


export const BillingForm: React.FC = () => {
return (
<form className="space-y-4">
<input placeholder="First Name" className="w-full border p-2" required />
<input placeholder="Company Name" className="w-full border p-2" />
<input placeholder="Street Address" className="w-full border p-2" required />
<input placeholder="Apartment, floor, etc. (optional)" className="w-full border p-2" />
<input placeholder="Town/City" className="w-full border p-2" required />
<input placeholder="Phone Number" className="w-full border p-2" required />
<input placeholder="Email Address" className="w-full border p-2" required type="email" />


<label className="flex items-center gap-2 text-sm">
<input type="checkbox" />
Save this info for next time
</label>
</form>
);
};