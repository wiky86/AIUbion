// === Quiz Logic ===
const quizQuestions = [
    {
        q: "Q1. AI 교육을 알아보시는 가장 큰 목적은 무엇인가요?",
        opts: [
            { t: "취업/이직을 위한 확실한 스펙", v: "student" },
            { t: "내 업무 속도와 효율성 향상", v: "worker" },
            { t: "팀/회사 차원의 디지털 역량 강화", v: "b2b", skip: true },
            { t: "기초부터 가문 교양 학습", v: "hobby" }
        ]
    },
    {
        q: "Q2. 현재 AI 툴 활용 경험은 어느 정도이신가요?",
        opts: [
            { t: "완전 처음이에요.", v: "0" },
            { t: "ChatGPT를 조금 써본 정도예요.", v: "1" },
            { t: "파이썬 데이터 분석 경험이 있어요.", v: "2" },
            { t: "프로그래밍 실무 경험이 충분해요.", v: "3" }
        ]
    },
    {
        q: "Q3. 어떤 학습 방식을 선호하시나요?",
        opts: [
            { t: "자율적인 VOD 중심 학습", v: "vod" },
            { t: "강사와 함께하는 실시간 부트캠프", v: "live" },
            { t: "결과물을 만드는 실습 중심 학습", v: "project" }
        ]
    }
];

let currentQ = 0;
let quizAnswers = {};

function showQuizSelection() {
    document.getElementById('quiz-container').innerHTML = `
        <div class="text-center mb-10 animate-fade-in-up">
            <span class="bg-indigo-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">AI/빅데이터 역량 진단</span>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">나에게 맞는 진단 방식을 선택하세요</h2>
            <p class="text-indigo-200">목표하는 직무의 스킬 트리를 직접 평가해보거나, 1분 퀵 진단으로 추천을 받아보세요.</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6 animate-fade-in-up" style="animation-delay: 0.1s">
            <div class="bg-white/5 border border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all cursor-pointer group flex flex-col items-center text-center" onclick="startSkillTreeDiagnosis()">
                <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">🌳</div>
                <h3 class="text-2xl font-bold mb-2 text-yellow-300">스킬트리 자가진단</h3>
                <p class="text-indigo-100 mb-6 text-sm">프롬프트 엔지니어, 데이터 분석가 등 목표 직무 핵심 스킬을 직접 평가하고 보완점을 확인하세요.</p>
                <button class="mt-auto w-full bg-white text-indigo-900 font-bold py-3 rounded-xl group-hover:bg-indigo-50 transition-colors shadow-lg">스킬트리 시작하기</button>
            </div>
            <div class="bg-white/5 border border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all cursor-pointer group flex flex-col items-center text-center" onclick="startQuiz()">
                <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                <h3 class="text-2xl font-bold mb-2 text-emerald-300">1분 퀵 진단</h3>
                <p class="text-indigo-100 mb-6 text-sm">딱 4개의 간단한 질문에 답하고 나에게 완벽한 K-Digital 코스를 빠르게 추천받으세요.</p>
                <button class="mt-auto w-full bg-white text-indigo-900 font-bold py-3 rounded-xl group-hover:bg-indigo-50 transition-colors shadow-lg">퀵 진단 시작하기</button>
            </div>
        </div>
    `;
}

function startQuiz() {
    currentQ = 0;
    quizAnswers = {};
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    if (currentQ >= quizQuestions.length) {
        showQuizResult();
        return;
    }

    const q = quizQuestions[currentQ];
    let html = `
        <div class="animate-fade-in-up">
            <div class="text-indigo-300 font-bold mb-2">Step ${currentQ + 1} / ${quizQuestions.length}</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-8 leading-snug">${q.q}</h3>
            <div class="space-y-3">
    `;
    
    q.opts.forEach(opt => {
        html += `
            <button onclick="handleAnswer('${opt.v}', ${opt.skip || false})" class="w-full text-left bg-indigo-800/50 hover:bg-indigo-600 border border-indigo-500/50 p-5 rounded-xl transition-all hover:scale-[1.02] flex justify-between items-center group">
                <span class="font-medium text-lg">${opt.t}</span>
                <span class="text-indigo-300 group-hover:text-white">&rarr;</span>
            </button>
        `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
}

function handleAnswer(val, skip) {
    quizAnswers[currentQ] = val;
    if (skip) {
        showB2BForm();
    } else {
        currentQ++;
        renderQuiz();
    }
}

function showB2BForm() {
    document.getElementById('quiz-container').innerHTML = `
        <div class="text-center animate-fade-in-up">
            <div class="text-5xl mb-4">🏢</div>
            <h3 class="text-3xl font-bold mb-4">기업 맞춤형 교육 제안</h3>
            <p class="text-indigo-200 mb-8">전문 컨설턴트가 최적의 커리큘럼을 설계해 드립니다.</p>
            <a href="#" class="inline-block bg-emerald-500 text-white font-bold px-10 py-4 rounded-xl hover:bg-emerald-600 transition shadow-lg">상담 문의하기</a>
            <button onclick="showQuizSelection()" class="mt-6 text-indigo-300 underline block w-full">처음으로 돌아가기</button>
        </div>
    `;
}

function showQuizResult() {
    let recommend = "";
    let desc = "";
    if (quizAnswers[1] === "0" || quizAnswers[1] === "1") {
        recommend = "프롬프트 엔지니어링 완벽 가이드";
        desc = "AI 기초부터 실무 활용까지 쉽게 배울 수 있습니다.";
    } else {
        recommend = "파이썬 데이터 분석 & 시각화 기초";
        desc = "기존 실무 역량에 날개를 달아줄 코스입니다. 100% 국비 지원으로 결제 부담 없이 시작하세요!";
    }

    document.getElementById('quiz-container').innerHTML = `
        <div class="text-center animate-fade-in-up">
            <span class="bg-indigo-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">분석 완료</span>
            <h3 class="text-2xl font-medium mb-2 text-indigo-100">회원님께 딱 맞는 코스는</h3>
            <h2 class="text-3xl md:text-4xl font-extrabold mb-6 text-yellow-300">[${recommend}]</h2>
            <p class="text-indigo-100 mb-8 max-w-lg mx-auto">${desc}</p>
            <a href="#courses" class="bg-white text-indigo-900 font-bold px-8 py-4 rounded-xl shadow-lg">강좌 상세 보기</a>
            <button onclick="showQuizSelection()" class="mt-8 text-indigo-300 underline block w-full text-sm">다른 진단 해보기</button>
        </div>
    `;
}

// === Gamified Skill Tree Diagnosis Logic (PoE/Diablo Style) ===
const skillTreeJobs = {
    'data_analyst': {
        title: '데이터 분석가',
        icon: '📊',
        tiers: [
            { id: 't1', name: '기초 (Basic)', desc: '데이터를 다루기 위한 기본기', skills: [
                { id: 'python', name: 'Python', req: 5, desc: 'Pandas, NumPy 활용능력', x: 20, y: 10 },
                { id: 'sql', name: 'SQL', req: 5, desc: 'RDBMS 질의 및 추출', x: 80, y: 10 },
                { id: 'math', name: '통계학', req: 4, desc: '확률, 검정, 분포의 이해', x: 50, y: 25 }
            ]},
            { id: 't2', name: '심화 (Advanced)', desc: '본격적인 데이터 분석 및 모델링', skills: [
                { id: 'eda', name: '탐색적 분석', req: 4, desc: '시각화 및 인사이트 도출 (EDA)', x: 30, y: 45 },
                { id: 'ml_basic', name: '머신러닝 기초', req: 4, desc: '회귀, 분류 알고리즘 이해', x: 70, y: 45 },
                { id: 'preprocess', name: '데이터 전처리', req: 5, desc: '결측치, 이상치, 스케일링', x: 50, y: 60 }
            ]},
            { id: 't3', name: '전문 (Expert)', desc: '고급 분석 및 실무 최적화', skills: [
                { id: 'dl_basic', name: '딥러닝 기초', req: 3, desc: '신경망 구조 및 기본 동작', x: 20, y: 80 },
                { id: 'ab_test', name: 'A/B 테스트', req: 4, desc: '실험 설계 및 성과 검증', x: 80, y: 80 },
                { id: 'dashboard', name: '대시보드', req: 4, desc: 'Tableau, PowerBI 활용', x: 50, y: 95 }
            ]}
        ]
    },
    'prompt_engineer': {
        title: '프롬프트 엔지니어',
        icon: '✍️',
        tiers: [
            { id: 't1', name: '기초 (Basic)', desc: 'AI 모델과 소통하기', skills: [
                { id: 'llm_basic', name: 'LLM 이해', req: 5, desc: 'GPT 구조 및 환각 현상 이해', x: 50, y: 15 },
                { id: 'prompt_101', name: '프롬프트 기초', req: 5, desc: '명확한 지시문 작성법', x: 30, y: 35 },
                { id: 'python_101', name: 'Python 기초', req: 3, desc: 'API 호출을 위한 스크립트 작성', x: 70, y: 35 }
            ]},
            { id: 't2', name: '심화 (Advanced)', desc: '고급 프롬프팅 기법', skills: [
                { id: 'cot', name: 'CoT 설계', req: 5, desc: '생각의 사슬(Chain-of-Thought) 기법', x: 20, y: 55 },
                { id: 'few_shot', name: 'Few-shot', req: 5, desc: '예시를 통한 문맥 추론 향상', x: 80, y: 55 },
                { id: 'api_int', name: 'API 연동', req: 4, desc: 'OpenAI 등 외부 API 연동', x: 50, y: 65 }
            ]},
            { id: 't3', name: '전문 (Expert)', desc: '시스템 오케스트레이션', skills: [
                { id: 'rag', name: 'RAG 구현', req: 4, desc: '검색 증강 생성 파이프라인 이해', x: 30, y: 85 },
                { id: 'langchain', name: 'LangChain', req: 4, desc: '에이전트 및 툴 활용 파이프라인 구축', x: 70, y: 85 },
                { id: 'eval', name: '모델 평가', req: 4, desc: '생성 결과물 정량/정성 평가', x: 50, y: 95 }
            ]}
        ]
    },
    'ai_developer': {
        title: 'AI 서비스 개발자',
        icon: '⚙️',
        tiers: [
            { id: 't1', name: '기초 (Basic)', desc: '개발 및 데이터 기초', skills: [
                { id: 'python_adv', name: 'Python 심화', req: 5, desc: '객체지향 설계 및 클린 코드', x: 50, y: 10 },
                { id: 'git', name: 'Git/GitHub', req: 4, desc: '버전 관리 및 협업', x: 20, y: 25 },
                { id: 'linux', name: 'Linux/CLI', req: 3, desc: '리눅스 환경 명령어 기초', x: 80, y: 25 }
            ]},
            { id: 't2', name: '심화 (Advanced)', desc: 'AI 모델링 강화', skills: [
                { id: 'dl_adv', name: '딥러닝 심화', req: 4, desc: 'PyTorch/TensorFlow 활용', x: 35, y: 45 },
                { id: 'cv_nlp', name: 'CV/NLP', req: 4, desc: '비전 또는 자연어 처리 모델 적용', x: 65, y: 45 },
                { id: 'backend', name: '백엔드 기초', req: 4, desc: 'FastAPI/Flask API 서버 구축', x: 50, y: 60 }
            ]},
            { id: 't3', name: '전문 (Expert)', desc: '배포 및 MLOps', skills: [
                { id: 'docker', name: 'Docker', req: 4, desc: '컨테이너 기반 환경 구축', x: 20, y: 75 },
                { id: 'cloud', name: 'Cloud 배포', req: 4, desc: 'AWS/GCP/Azure 인프라 활용', x: 80, y: 75 },
                { id: 'mlops', name: 'MLOps 기초', req: 3, desc: '파이프라인 자동화 및 모니터링', x: 50, y: 95 }
            ]}
        ]
    }
};

const softSkills = [
    { id: 'comm', name: '커뮤니케이션', req: 4, desc: '타 부서와의 원활한 소통' },
    { id: 'doc', name: '문서 작성', req: 4, desc: '기획서, 보고서, 기술 블로그 작성' },
    { id: 'problem', name: '문제 해결력', req: 5, desc: '원인 분석 및 논리적 대안 제시' },
    { id: 'learning', name: '학습 능력', req: 5, desc: '최신 AI 트렌드 및 기술 습득 속도' },
    { id: 'tools', name: '협업 도구', req: 4, desc: 'Jira, Slack, Notion 등 활용' },
    { id: 'biz', name: '비즈니스 마인드', req: 3, desc: '기술이 비즈니스에 미치는 영향 이해' }
];

let selectedJob = null;
let userSkills = {}; // Stores both hard (by id) and soft (by id) skill ratings
let activeSidePanel = null; // 'hard' or 'soft'

function startSkillTreeDiagnosis() {
    selectedJob = null;
    userSkills = {};
    activeSidePanel = null;
    renderJobSelection();
}

function renderJobSelection() {
    let html = `
        <div class="text-center mb-8 animate-fade-in-up">
            <span class="bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block">스킬트리 자가진단</span>
            <h2 class="text-3xl font-bold mb-2">어떤 직무를 목표로 하시나요?</h2>
            <p class="text-indigo-200">목표하는 직무를 선택하면 필요한 핵심 스킬을 알려드립니다.</p>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 animate-fade-in-up" style="animation-delay: 0.1s">
    `;

    Object.keys(skillTreeJobs).forEach(jobKey => {
        const job = skillTreeJobs[jobKey];
        html += `
            <button onclick="selectSkillTreeJob('${jobKey}')" class="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 transition-all hover:-translate-y-1 text-center">
                <div class="text-4xl mb-3">${job.icon}</div>
                <h3 class="font-bold text-lg">${job.title}</h3>
            </button>
        `;
    });

    html += `
        </div>
        <div class="text-center mt-8 animate-fade-in-up" style="animation-delay: 0.2s">
            <button onclick="showQuizSelection()" class="text-indigo-300 underline text-sm hover:text-white transition-colors">이전 화면으로 돌아가기</button>
        </div>
    `;
    
    document.getElementById('quiz-container').innerHTML = html;
}

function selectSkillTreeJob(jobKey) {
    selectedJob = jobKey;
    userSkills = {};
    
    // Initialize hard skills
    skillTreeJobs[jobKey].tiers.forEach(tier => {
        tier.skills.forEach(s => userSkills[s.id] = 0);
    });
    
    // Initialize soft skills
    softSkills.forEach(s => userSkills[s.id] = 0);
    
    renderGamifiedSkillTree();
}

function renderGamifiedSkillTree() {
    const job = skillTreeJobs[selectedJob];
    
    let html = `
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 animate-fade-in-up relative z-20">
            <div>
                <span class="bg-indigo-600 border border-indigo-400 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-[0_0_10px_rgba(79,70,229,0.5)]">${job.icon} ${job.title}</span>
                <h2 class="text-2xl font-bold text-white">클래스 스킬 트리</h2>
            </div>
            <div class="flex gap-2 mt-4 md:mt-0">
                <button onclick="renderJobSelection()" class="text-gray-400 hover:text-white text-sm underline">클래스 변경</button>
                <button onclick="submitSkillTree()" class="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-2 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all transform hover:scale-105">전직 심사 (결과 분석)</button>
            </div>
        </div>

        <div class="flex flex-col gap-6 animate-fade-in-up" style="animation-delay: 0.1s">
            <!-- Top Side: Soft Skills (Side Tree) -->
            <div class="w-full bg-skilltree-dark border border-gray-700/50 rounded-2xl p-4 relative overflow-hidden shadow-2xl">
                <div class="absolute inset-0 bg-indigo-900/10 z-0"></div>
                <h3 class="font-bold text-indigo-300 mb-4 border-b border-indigo-900/50 pb-2 z-10 flex items-center justify-between relative">
                    <span>기본 소양 (Soft Skills)</span>
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 z-20 pb-2 p-1 relative">
                    ${softSkills.map(s => renderSkillEditorItem(s)).join('')}
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-6">
                <!-- Center: Main Skill Tree Canvas -->
                <div class="w-full md:w-2/3 bg-skilltree-dark border border-gray-700 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col">
                    <!-- Background Grid/Decorations -->
                    <div class="absolute inset-0 z-0 opacity-20" style="background-image: linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px); background-size: 20px 20px;"></div>
                    
                    <div class="flex-grow relative z-10 p-6 pt-12 pb-20" id="tree-canvas">
                        <!-- SVG Lines container (absolute) -->
                        <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" id="tree-svg"></svg>
                        
                        ${job.tiers.map((tier, tIdx) => `
                            <div class="mb-16 relative z-10">
                                <!-- Tier Separator -->
                                <div class="flex items-center mb-10 relative">
                                    <span class="bg-gray-800 border border-gray-600 text-gray-300 text-xs px-2 py-1 rounded font-bold tier-label pointer-events-none">${tier.name}</span>
                                    <div class="h-[1px] bg-gradient-to-r from-gray-600 to-transparent flex-grow ml-2 pointer-events-none"></div>
                                </div>
                                <!-- Skills in Tier -->
                                <div class="relative h-32 w-full">
                                    ${tier.skills.map(skill => {
                                        const score = userSkills[skill.id];
                                        return `
                                        <div class="absolute transform -translate-x-1/2 -translate-y-1/2 group" style="left: ${skill.x}%; top: ${skill.y}%;" id="node-${skill.id}">
                                            <div class="skill-node" data-rating="${score}" onclick="activateSkillEditor('${skill.id}', 'hard', '${tier.id}')">
                                                ${score > 0 ? (score === 5 ? '★' : score) : ''}
                                            </div>
                                            <!-- Tooltip -->
                                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 border border-gray-700 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center shadow-xl">
                                                <div class="font-bold text-indigo-300 mb-1">${skill.name}</div>
                                                <div class="text-gray-400">${skill.desc}</div>
                                                <div class="mt-1 text-yellow-500 font-bold">LV: ${score} / 5</div>
                                            </div>
                                        </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Right Side: Active Skill Editor -->
                <div class="w-full md:w-1/3 bg-skilltree-dark border border-gray-700/50 rounded-2xl p-4 flex flex-col relative overflow-hidden shadow-2xl h-fit sticky top-24">
                     <div class="absolute inset-0 bg-indigo-900/10 z-0"></div>
                     <h3 class="font-bold text-indigo-300 mb-4 border-b border-indigo-900/50 pb-2 z-10">스킬 정보 및 레벨업</h3>
                     <div id="skill-editor-container" class="z-10 flex-grow flex items-center justify-center text-gray-500 text-sm text-center">
                        트리에서 스킬 노드 또는 소양을 클릭하여<br>현재 레벨을 평가하세요.
                     </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('quiz-container').innerHTML = html;
    
    // Draw SVG connections after rendering HTML
    setTimeout(drawTreeConnections, 50);
}

function drawTreeConnections() {
    const svg = document.getElementById('tree-svg');
    if (!svg) return;
    
    const job = skillTreeJobs[selectedJob];
    let svgHtml = '';
    
    // Simple logic: connect nodes between adjacent tiers if they exist
    for (let t = 0; t < job.tiers.length - 1; t++) {
        const currentTier = job.tiers[t];
        const nextTier = job.tiers[t+1];
        
        currentTier.skills.forEach(cSkill => {
            const cNode = document.getElementById(`node-${cSkill.id}`);
            if(!cNode) return;
            
            // Connect to 1 or 2 Random nodes in next tier for web-like look (simulated here predictability)
            nextTier.skills.forEach((nSkill, nIdx) => {
                 // Determine connection logic (e.g., connect if x pos is close, or just connect all to center)
                 // For now, simple vertical connections where x diff is < 40
                 if (Math.abs(cSkill.x - nSkill.x) <= 40) {
                     const nNode = document.getElementById(`node-${nSkill.id}`);
                     if (cNode && nNode) {
                         const cScore = userSkills[cSkill.id];
                         const nScore = userSkills[nSkill.id];
                         const isActive = cScore > 0 && nScore > 0;
                         
                         // Coordinates calculation relative to container
                         const svgRect = svg.getBoundingClientRect();
                         const cRect = cNode.getBoundingClientRect();
                         const nRect = nNode.getBoundingClientRect();
                         
                         // Node centers
                         const x1 = cRect.left - svgRect.left + cRect.width / 2;
                         const y1 = cRect.top - svgRect.top + cRect.height / 2;
                         const x2 = nRect.left - svgRect.left + nRect.width / 2;
                         const y2 = nRect.top - svgRect.top + nRect.height / 2;
                         
                         svgHtml += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="skill-path ${isActive ? 'active' : ''}" />`;
                     }
                 }
            });
        });
    }
    
    svg.innerHTML = svgHtml;
}

// Ensure lines redraw on resize
window.addEventListener('resize', () => {
    if (document.getElementById('tree-svg')) {
        drawTreeConnections();
    }
});


function renderSkillEditorItem(skill, isHardSkill = false) {
    const score = userSkills[skill.id];
    return `
        <div class="flex-1 min-w-[180px] bg-gray-800/80 border border-gray-600 rounded-lg p-3 transition-colors hover:border-indigo-500 cursor-pointer" onclick="activateSkillEditor('${skill.id}', '${isHardSkill ? 'hard' : 'soft'}')">
            <div class="font-bold text-sm text-gray-200">${skill.name}</div>
            <div class="flex items-center gap-1 mt-2">
                ${[1,2,3,4,5].map(i => `
                    <div class="w-4 h-4 rounded-sm ${i <= score ? (score === 5 ? 'bg-indigo-400 shadow-[0_0_5px_#818cf8]' : 'bg-yellow-500') : 'bg-gray-700'}"></div>
                `).join('')}
            </div>
        </div>
    `;
}

let currentEditingSkill = null;

function activateSkillEditor(skillId, type, tierId = null) {
    currentEditingSkill = { id: skillId, type: type };
    
    let skillObj = null;
    if (type === 'soft') {
        skillObj = softSkills.find(s => s.id === skillId);
    } else {
        const job = skillTreeJobs[selectedJob];
        for (const t of job.tiers) {
            const found = t.skills.find(s => s.id === skillId);
            if (found) {
                skillObj = found;
                break;
            }
        }
    }

    if (!skillObj) return;

    const currentScore = userSkills[skillId];
    
    const editorHtml = `
        <div class="flex flex-col h-full animate-fade-in-up">
            <h4 class="text-xl font-bold text-white mb-2">${skillObj.name}</h4>
            <p class="text-gray-400 text-sm mb-6">${skillObj.desc}</p>
            
            <div class="bg-gray-900/80 rounded-xl p-4 border border-gray-700 mb-auto flex flex-col items-center">
                <div class="text-indigo-300 text-sm font-bold mb-3 w-full text-center">요구 레벨: LV ${skillObj.req}</div>
                <div class="text-gray-300 text-sm font-bold mb-4 w-full text-center">현재 레벨 설정</div>
                <div class="flex flex-col gap-2 mb-4 w-32">
                    ${[5,4,3,2,1].map(i => `
                        <button onclick="updateSkillLevel('${skillId}', ${i})" class="w-full py-2 rounded-lg border font-bold text-lg transition-all flex items-center justify-center gap-2 ${i <= currentScore ? 'border-yellow-400 text-yellow-500 bg-yellow-400/10 shadow-[inset_0_0_10px_rgba(250,204,21,0.2)]' : 'border-gray-600 text-gray-500 hover:border-gray-400 hover:text-gray-300'}">
                            LV ${i}
                        </button>
                    `).join('')}
                </div>
                <!-- Optional: Reset button -->
                 <button onclick="updateSkillLevel('${skillId}', 0)" class="text-xs text-gray-500 hover:text-red-400 mt-2">포인트 초기화</button>
            </div>
        </div>
    `;
    
    document.getElementById('skill-editor-container').innerHTML = editorHtml;
    
    // Optional: add visual highlight to the selected node/item in the UI
}

function updateSkillLevel(skillId, level) {
    userSkills[skillId] = level;
    // Re-render the whole tree to update nodes, colors, and connection lines
    renderGamifiedSkillTree();
    // Re-activate the editor so it doesn't disappear
    if(currentEditingSkill) {
        // slight delay to let DOM render
        setTimeout(() => activateSkillEditor(currentEditingSkill.id, currentEditingSkill.type), 10);
    }
}

function submitSkillTree() {
    const job = skillTreeJobs[selectedJob];
    let hardGap = 0;
    let softGap = 0;
    
    let worstHardSkill = { gap: -1, name: '' };
    let worstSoftSkill = { gap: -1, name: '' };

    // Calculate Hard Skills Gap
    job.tiers.forEach(tier => {
        tier.skills.forEach(skill => {
            const gap = skill.req - userSkills[skill.id];
            hardGap += Math.max(0, gap);
            if (gap > worstHardSkill.gap) {
                worstHardSkill = { gap: gap, name: skill.name, tier: tier.name };
            }
        });
    });

    // Calculate Soft Skills Gap
    softSkills.forEach(skill => {
        const gap = skill.req - userSkills[skill.id];
        softGap += Math.max(0, gap);
        if (gap > worstSoftSkill.gap) {
            worstSoftSkill = { gap: gap, name: skill.name };
        }
    });

    const totalGap = hardGap + softGap;

    let resultTitle = "";
    let resultDesc = "";
    let courseLink = "#courses";

    if (totalGap === 0) {
        resultTitle = "완벽한 스탯! <br>[S등급 전직 승인]";
        resultDesc = "모든 필수/보조 스킬이 요구치를 만족합니다. 실무 프로젝트 경험을 더해 바로 포트폴리오를 증명할 수 있는 '프로젝트 코스'를 강력 추천합니다.";
    } else if (totalGap <= 5) {
        resultTitle = "잠재력 확인! <br>[A등급 전직 승인]";
        resultDesc = `전반적인 밸런스가 좋습니다. 다만, [${worstHardSkill.name}] 기술과 보조 소양인 [${worstSoftSkill.name}]을 조금 더 보완한다면 상위 1% 인재가 될 수 있습니다.`;
    } else {
        resultTitle = "파밍이 필요합니다. <br>[B등급 전직 보류]";
        resultDesc = `목표 클래스에 도달하기 위해 전반적인 스펙업이 필요합니다. 특히 ${worstHardSkill.tier} 단계의 [${worstHardSkill.name}] 역량 강화를 위한 기초 코스 수강을 권장합니다.`;
    }

    document.getElementById('quiz-container').innerHTML = `
        <div class="text-center animate-fade-in-up">
            <div class="bg-gray-900 border border-gray-700/50 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div class="absolute inset-0 bg-skilltree-dark opacity-50 z-0"></div>
                <div class="relative z-10">
                    <span class="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded inline-block mb-6 shadow-[0_0_10px_rgba(79,70,229,0.5)]">분석 코어 가동 완료</span>
                    <h3 class="text-xl font-bold mb-4 text-gray-300">클래스 [${job.title}] 심사 결과</h3>
                    <h2 class="text-3xl md:text-5xl font-extrabold mb-8 text-yellow-400 leading-tight">${resultTitle}</h2>
                    
                    <div class="bg-black/40 border border-gray-600 p-6 rounded-xl text-left mb-8">
                        <p class="text-gray-300 text-lg leading-relaxed">${resultDesc}</p>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="${courseLink}" class="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all transform hover:scale-105">경험치 획득하러 가기 (추천 코스)</a>
                        <button onclick="startSkillTreeDiagnosis()" class="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-4 rounded-xl transition-colors border border-gray-500">돌아가기 (재평가)</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// === Wordle Logic ===
const targetWord = "PROMPT"; // 6-letter word directly related to AI
const maxAttempts = 6;
const wordLength = targetWord.length;
let currentAttempt = 0;
let streak = 0;

document.addEventListener("DOMContentLoaded", () => {
    streak = parseInt(localStorage.getItem('streakCount') || "0");
    const streakEl = document.getElementById('streak-count');
    if(streakEl) streakEl.innerText = streak;

    const board = document.getElementById('wordle-board');
    if(board) {
        board.style.gridTemplateColumns = `repeat(${wordLength}, minmax(0, 1fr))`;
        
        for (let i = 0; i < maxAttempts; i++) {
            const row = document.createElement('div');
            row.id = `w-row-${i}`;
            row.className = "flex gap-2 justify-center col-span-full";
            for (let j = 0; j < wordLength; j++) {
                const cell = document.createElement('div');
                cell.className = "wordle-cell w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200 flex items-center justify-center text-xl sm:text-2xl font-bold rounded-lg uppercase bg-gray-50 text-gray-800 shadow-sm";
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    const wordleInput = document.getElementById('wordle-input');
    if(wordleInput) {
        wordleInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') submitWordle();
        });
    }
});

function submitWordle() {
    const inputEl = document.getElementById('wordle-input');
    const msgEl = document.getElementById('wordle-msg');
    let guess = inputEl.value.toUpperCase();

    if (guess.length !== wordLength) {
        msgEl.innerText = `${wordLength}글자를 입력해주세요.`;
        return;
    }
    if (currentAttempt >= maxAttempts) return;

    msgEl.innerText = "";
    const row = document.getElementById(`w-row-${currentAttempt}`).children;
    let targetChars = targetWord.split('');
    let guessChars = guess.split('');
    
    for (let i = 0; i < wordLength; i++) {
        row[i].innerText = guessChars[i];
        if (guessChars[i] === targetChars[i]) {
            row[i].classList.add('correct');
            targetChars[i] = null;
            guessChars[i] = null;
        }
    }

    for (let i = 0; i < wordLength; i++) {
        if (guessChars[i] !== null) {
            const idx = targetChars.indexOf(guessChars[i]);
            if (idx > -1) {
                row[i].classList.add('present');
                targetChars[idx] = null;
            } else {
                row[i].classList.add('absent');
            }
        }
    }

    if (guess === targetWord) {
        msgEl.innerText = "정답입니다! 🎉";
        msgEl.className = "text-center mt-4 font-bold h-6 text-green-600 text-xl";
        streak++;
        localStorage.setItem('streakCount', streak);
        document.getElementById('streak-count').innerText = streak;
        inputEl.disabled = true;
        if (streak >= 3) {
            setTimeout(() => alert("축하합니다! 3일 연속 정답 보상으로 '수강료 10% 할인 쿠폰'이 발급되었습니다."), 500);
        }
    } else {
        currentAttempt++;
        if (currentAttempt >= maxAttempts) {
            msgEl.innerText = `아쉽네요. 정답은 ${targetWord} 입니다.`;
            inputEl.disabled = true;
            streak = 0;
            localStorage.setItem('streakCount', streak);
            document.getElementById('streak-count').innerText = streak;
        }
    }
    inputEl.value = "";
}

// === Daily AI Knowledge Quiz Logic ===
const dailyQuizQuestions = [
    {
        id: 1,
        q: "ChatGPT와 같은 대규모 언어 모델(LLM)이 문장을 생성할 때 사용하는 가장 기본적인 원리는 무엇일까요?",
        opts: [
            { t: "단어의 사전적 의미를 조합한다", v: "1" },
            { t: "다음에 올 확률이 가장 높은 단어를 예측한다", v: "2", correct: true },
            { t: "미리 작성된 답변 데이터베이스에서 검색한다", v: "3" },
            { t: "문법 규칙에 따라 문장을 구조화한다", v: "4" }
        ],
        exp: "LLM은 방대한 텍스트 데이터를 학습하여, 앞선 단어들의 패턴을 기반으로 통계적으로 다음에 등장할 확률이 가장 높은 단어를 순차적으로 예측하며 문장을 생성합니다."
    },
    {
        id: 2,
        q: "파이썬(Python)에서 데이터 분석 시 엑셀과 같은 표 형태의 데이터를 다루기 위해 가장 널리 사용되는 데이터 조작 라이브러리는 무엇인가요?",
        opts: [
            { t: "NumPy", v: "1" },
            { t: "TensorFlow", v: "2" },
            { t: "Matplotlib", v: "3" },
            { t: "Pandas", v: "4", correct: true }
        ],
        exp: "Pandas는 파이썬 데이터 분석의 핵심 라이브러리로, DataFrame이라는 2차원 자료구조를 제공하여 데이터를 쉽게 다루고 분석할 수 있게 해줍니다."
    },
    {
        id: 3,
        q: "데이터베이스에서 특정 데이터를 추출하거나 조작하기 위해 사용하는 표준 언어는 무엇일까요?",
        opts: [
            { t: "SQL", v: "1", correct: true },
            { t: "HTML", v: "2" },
            { t: "CSS", v: "3" },
            { t: "JSON", v: "4" }
        ],
        exp: "SQL(Structured Query Language)은 관계형 데이터베이스 관리 시스템(RDBMS)의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어입니다."
    }
];

let knowledgeStreak = 0;
let todayQuizIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    initDailyQuiz();
});

function initDailyQuiz() {
    // Determine "today" index based on current date
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    todayQuizIndex = dayOfYear % dailyQuizQuestions.length;
    
    knowledgeStreak = parseInt(localStorage.getItem('knowledgeStreakCount') || "0");
    const streakEl = document.getElementById('knowledge-streak-count');
    if(streakEl) streakEl.innerText = knowledgeStreak;

    renderDailyQuiz();
}

function renderDailyQuiz() {
    const container = document.getElementById('daily-quiz-container');
    if (!container) return;

    const q = dailyQuizQuestions[todayQuizIndex];
    const todayStr = new Date().toISOString().split('T')[0];
    const answered = localStorage.getItem(`quizAnswered_${todayStr}`);
    const isCorrect = localStorage.getItem(`quizCorrect_${todayStr}`) === 'true';

    if (answered) {
        // Already answered today
        container.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                <div class="text-6xl mb-4">${isCorrect ? '🎉' : '💡'}</div>
                <h4 class="text-xl font-bold mb-2">${isCorrect ? '정답입니다! 스트릭 유지 성공!' : '아쉽습니다. 오답입니다.'}</h4>
                <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left mt-4 w-full text-sm">
                    <p class="font-bold text-gray-800 mb-1">오늘의 해설:</p>
                    <p class="text-gray-600">${q.exp}</p>
                </div>
                <p class="text-gray-400 text-sm mt-6 font-medium">내일 자정에 새로운 문제가 출제됩니다.</p>
            </div>
        `;
        return;
    }

    // Not answered yet
    let html = `
        <div class="animate-fade-in-up flex flex-col h-full">
            <h4 class="text-lg md:text-xl font-bold mb-6 flex-grow text-gray-800 leading-snug">${q.q}</h4>
            <div class="space-y-3 mt-auto">
    `;
    
    q.opts.forEach(opt => {
        const isOptCorrect = opt.correct || false;
        html += `
            <button onclick="submitDailyQuiz(${isOptCorrect})" class="w-full text-left bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 p-4 rounded-xl transition-all hover:scale-[1.01] flex justify-between items-center group shadow-sm">
                <span class="font-medium text-gray-700 group-hover:text-purple-700">${opt.t}</span>
            </button>
        `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
}

function submitDailyQuiz(isCorrect) {
    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(`quizAnswered_${todayStr}`, 'true');
    localStorage.setItem(`quizCorrect_${todayStr}`, isCorrect);

    if (isCorrect) {
        knowledgeStreak++;
    } else {
        knowledgeStreak = 0;
    }
    
    localStorage.setItem('knowledgeStreakCount', knowledgeStreak);
    const streakEl = document.getElementById('knowledge-streak-count');
    if(streakEl) streakEl.innerText = knowledgeStreak;

    // Re-render
    renderDailyQuiz();
}
