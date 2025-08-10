import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUsSection() {
  return (
    <section className="w-full px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div>
          <p className="mb-6 text-gray-600">
            Have questions or need help with booking? Reach out to us, we’re
            here 24/7 to assist your travel experience.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" /> support@travelapp.com
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-600" /> +62 812-3456-7890
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" /> Jakarta, Indonesia
            </div>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7449383872636!2d106.82715351529665!3d-6.175387995528089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42d62b1c6df%3A0x301576d14febfe0!2sMonas%20Jakarta!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
