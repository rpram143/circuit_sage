import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import RealWorldMode from '../components/RealWorldMode';
import RescueMissions from '../components/RescueMissions';
import ComparisonSection from '../components/ComparisonSection';

export default function Solution() {
    return (
        <main className="pt-20 bg-slate-950 min-h-screen">
            <ProblemSection />
            <SolutionSection />
            <RealWorldMode />
            <RescueMissions />
            <ComparisonSection />
        </main>
    );
}
