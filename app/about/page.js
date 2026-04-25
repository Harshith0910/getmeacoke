import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen text-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold mb-8">About GetMeACoke</h1>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-300 leading-relaxed">
                        GetMeACoke is a platform that empowers creators to build sustainable income through direct fan support. Whether you're an artist, musician, podcaster, or content creator, we make it easy for your audience to contribute and access exclusive content.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
                    <ul className="text-gray-300 space-y-3">
                        <li>✓ Creator-friendly platform with transparent pricing</li>
                        <li>✓ Easy subscription management for supporters</li>
                        <li>✓ Exclusive member-only content and perks</li>
                        <li>✓ Secure payments and reliable payouts</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
                    <p className="text-gray-300 mb-6">
                        Ready to turn your passion into income? Join thousands of creators already using GetMeACoke.
                    </p>
                    <Link href="/login" className="text-gray-900 bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
                    Become a Creator
                    </Link>
                </section>
            </div>
        </div>
    );
}

export const metadata = {
    title: 'About - GetMeACoke',
};