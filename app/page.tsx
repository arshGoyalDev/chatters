import { TransitionLink } from "@/components/animations";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white overflow-hidden">
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-20 lg:px-40 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,126,125,0.1),transparent_70%)]"></div>

        <div className="container mx-auto max-w-7xl z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
                  CHATTERS
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 mb-8">
                A modern chat experience like no other. Connect with the world{" "}
                <span className="text-primary font-bold">
                  without a sec of delay
                </span>
                .
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <TransitionLink
                  href="/auth"
                  className="py-3 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                  Get Started
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-950/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Experience the next generation of messaging with our feature-rich
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default">
              <h3 className="text-xl font-bold mb-2">Real-time Messaging</h3>
              <p className="text-zinc-400">
                Send and receive messages instantly with our lightning-fast
                real-time messaging system.
              </p>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default">
              <h3 className="text-xl font-bold mb-2">Share Files</h3>
              <p className="text-zinc-400">
                Share documents, images, audios and more relevant to your chats.
              </p>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default">
              <h3 className="text-xl font-bold mb-2">Blazing Fast</h3>
              <p className="text-zinc-400">
                Optimized for speed and performance, ensuring smooth
                communication even on slow networks.
              </p>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default">
              <h3 className="text-xl font-bold mb-2">Group Chats</h3>
              <p className="text-zinc-400">
                Create and manage group conversations with friends, family, or
                colleagues with ease.
              </p>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default">
              <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
              <p className="text-zinc-400">
                Access your chats from any device with our seamless
                cross-platform experience.
              </p>
            </div>

            <div className="bg-zinc-800/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-default">
              <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
              <p className="text-zinc-400">
                Fully responsive design that works perfectly on mobile devices
                and tablets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,126,125,0.15),transparent_70%)]"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="bg-zinc-900/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-zinc-800 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start chatting?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users already enjoying the Chatters experience.
              Sign up today and connect with the world.
            </p>

            <TransitionLink
              href="/auth"
              className="py-4 px-10 text-xl font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Get Started Now
            </TransitionLink>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold">CHATTERS</div>
            <div className="text-zinc-500">
              {" "}
              2024 Chatters. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
