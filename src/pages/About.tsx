import React from 'react';
import AboutHero from '../components/about/AboutHero';
import OriginStory from '../components/about/OriginStory';
import ImpactNumbers from '../components/about/ImpactNumbers';
import CoreValues from '../components/about/CoreValues';
import TeamPreview from '../components/about/TeamPreview';
import CommunityProof from '../components/about/CommunityProof';
import PoeticCTA from '../components/about/PoeticCTA';

const About: React.FC = () => (
    <div className="min-h-screen bg-brand-dark">
        <AboutHero />
        <OriginStory />
        <ImpactNumbers />
        <CoreValues />
        <TeamPreview />
        <CommunityProof />
        <PoeticCTA />
    </div>
);

export default About;
