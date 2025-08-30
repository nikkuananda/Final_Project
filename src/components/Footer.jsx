export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-white">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Travel.</h3>
          <p className="opacity-80">
            Plan your next escape with curated packages, promos, and easy
            checkout.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Our Agency</h4>
          <ul className="space-y-1 opacity-80 text-sm">
            <li>Services</li>
            <li>Insurance</li>
            <li>Payment</li>
            <li>Tourism</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Last Minute</h4>
          <ul className="space-y-1 opacity-80 text-sm">
            <li>London</li>
            <li>California</li>
            <li>Indonesia</li>
            <li>Oceania</li>
          </ul>
        </div>
      </div>
      <div className="text-center py-3 bg-slate-800 text-xs">
        COPYRIGHT © {new Date().getFullYear()} - Bootcamp
      </div>
    </footer>
  );
}
