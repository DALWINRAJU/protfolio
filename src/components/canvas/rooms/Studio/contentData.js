/**
 * Studio Content Data
 * 
 * Custom content for Dalwin's interactive monitor towers.
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#00D9FF',
        accentColor: '#5BE7FF',
        icon: '▶',
        label: 'Tech Demo',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#5BE7FF',
        accentColor: '#00D9FF',
        icon: '📝',
        label: 'Case Study',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00D9FF',
        accentColor: '#5BE7FF',
        icon: '📱',
        label: 'Micro Motion',
        shape: 'phone', // Vertical phone
    },
    linkedin: {
        color: '#00D9FF',
        accentColor: '#5BE7FF',
        icon: 'in',
        label: 'Milestone',
        shape: 'monitor',
    },
    codrops: {
        color: '#00D9FF',
        accentColor: '#5BE7FF',
        icon: '💧',
        label: 'Featured',
        shape: 'monitor',
    },
};

const RAW_CONTENT_DATA = [
    // ============ Internships & Experience ============
    {
        id: 'studio-vydctc-internship',
        platform: 'blog',
        badge: 'INTERNSHIP',
        floatingName: 'VYDCTC INTERNSHIP',
        color: '#00D9FF',
        baseColor: '#eef8fa',
        title: 'Software Development Intern — VYDCTC India Pvt Ltd',
        description: 'Collaborated with a cross-functional development team across the full SDLC. Strengthened debugging, code review, and Agile workflows under mentor guidance.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.linkedin.com/in/dalwinraju-r/',
        date: '1 Month',
        readTime: 'SDLC & Agile',
    },
    // ============ Research & International Conclave ============
    {
        id: 'studio-conclave-research',
        platform: 'blog',
        badge: 'RESEARCH PAPER',
        floatingName: "INT'L CONCLAVE RESEARCH",
        color: '#A855F7',
        baseColor: '#f7f2fc',
        title: 'International Conclave Research Paper Presentation',
        description: 'Successfully presented a research paper at the International Conclave conducted by Tamil Nadu Dr. Ambedkar Law University in collaboration with Anna University, Chennai.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.linkedin.com/in/dalwinraju-r/',
        date: 'International',
        readTime: 'Conclave',
    },
    // ============ 1st Prize Paper Presentation ============
    {
        id: 'studio-prize-thanjavur',
        platform: 'youtube',
        badge: '1ST PRIZE',
        floatingName: '1ST PRIZE PAPER PRESENTATION',
        color: '#F59E0B',
        baseColor: '#fef8ee',
        title: '1st Prize Paper Presentation — Thanjavur Govt College',
        description: 'Secured 1st Prize for innovative technical paper presentation at Thanjavur Government College Symposium among top state-wide engineering college teams.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.linkedin.com/in/dalwinraju-r/',
        date: 'Winner',
        readTime: 'Symposium',
    },
    // ============ 1st Prize Intra Hackathon ============
    {
        id: 'studio-prize-hackathon',
        platform: 'blog',
        badge: '1ST PRIZE',
        floatingName: '1ST PRIZE INTRA HACKATHON',
        color: '#10B981',
        baseColor: '#edfbf5',
        title: '1st Prize Winner — Intra Hackathon, GCE Srirangam',
        description: 'Won 1st Prize in Intra Hackathon at Government College of Engineering, Srirangam, building real-world software solutions under strict competition deadlines.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://github.com/DALWINRAJU',
        date: 'Champion',
        readTime: 'Hackathon',
    },
    // ============ Symposium Prizes & Knowledge Battle ============
    {
        id: 'studio-symposium-prizes',
        platform: 'tiktok',
        badge: 'PRIZES & HONORS',
        floatingName: 'SYMPOSIUM PRIZES & BATTLE',
        color: '#F43F5E',
        baseColor: '#fff1f2',
        title: 'State Symposium Prizes — Kalasalingam & Dharmapuri',
        description: '2nd Prize Paper Presentation at Kalasalingam University; 3rd Prize Paper Presentation & 2nd Prize Knowledge Battle at Dharmapuri GCE; Delegate in Erode & Coimbatore.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.linkedin.com/in/dalwinraju-r/',
        date: 'Multi-Prize',
        views: '4 Awards',
        likes: 'Statewide',
    },
    // ============ Real-World Software Delivery ============
    {
        id: 'studio-achievements-delivery',
        platform: 'blog',
        badge: 'ACHIEVEMENT',
        floatingName: 'SHIPPED REAL-WORLD APPS',
        color: '#3B82F6',
        baseColor: '#eff6ff',
        title: 'Designed, Developed & Deployed Production Web Apps',
        description: 'Built and deployed multiple production-grade web applications to faculty and peers, including full-stack map platforms, voice AI assistants, and productivity suites.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://github.com/DALWINRAJU',
        date: 'Production',
        readTime: 'Full-Stack',
    },
    // ============ Certifications ============
    {
        id: 'studio-certifications',
        platform: 'blog',
        badge: 'CERTIFICATIONS',
        floatingName: 'ORACLE & GUVI CERTIFIED',
        color: '#8B5CF6',
        baseColor: '#f5f3ff',
        title: 'Oracle Certified Java & Codenatives Full Stack Developer',
        description: 'Oracle Certified Java Programming • Java Full Stack Development (Codenatives) • UI/UX Design (Internpe) • Generative AI (Guvi) certification credentials.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.linkedin.com/in/dalwinraju-r/',
        date: 'Credentials',
        readTime: '4 Certs',
    },
    // ============ UI/UX Design ============
    {
        id: 'studio-ui-ux-design',
        platform: 'youtube',
        badge: 'UI/UX DESIGN',
        floatingName: 'UI/UX DESIGN & FIGMA',
        color: '#FB923C',
        baseColor: '#fff7ed',
        title: 'UI/UX Design Fundamentals — Wireframing & Prototyping',
        description: 'Combining wireframing, interactive prototyping in Figma, user research, user flows, and visual design fundamentals with scalable full-stack code.',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.linkedin.com/in/dalwinraju-r/',
        date: 'Internpe',
        readTime: 'Design Thinking',
    },
];

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || null,
        paintedFrontTexture: item.paintedFrontTexture || null
    };
});

export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
