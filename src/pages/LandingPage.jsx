import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import StudentJourney from '../components/StudentJourney';
import RealWorldMode from '../components/RealWorldMode';
import ProfessorSection from '../components/ProfessorSection';
import ComparisonSection from '../components/ComparisonSection';
import RescueMissions from '../components/RescueMissions';

export default function LandingPage() {
    return (
        <main>
            <Hero />
            <ProblemSection />
            <SolutionSection />
            <StudentJourney />
            <RealWorldMode />
            <ProfessorSection />
            <ComparisonSection />
            <RescueMissions />
        </main>
    );
}
