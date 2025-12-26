import { Cpu, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg">
                                <Cpu className="text-white w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold text-white">Circuit Sage</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The smartest way to learn digital electronics. Visual, interactive, and built for future engineers.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">For Teachers</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Community Discord</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                    <p>© 2025 Circuit Sage. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                        <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                        <Linkedin className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
