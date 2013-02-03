/**
 * Guillem Francès <guillem.frances@gmail.com>
 *
 * This file contains the full Finite-State machine codification.
 */


var fsm = {
    stateMessages: {
        'greeting': "Hello, this is the MIIS information agent. I can provide you information about the master's courses, professors, fees, and some other relevant subjects.",
        "basic-question": "How can I help you?",
        "basic-question-silent": " ",

        'goodbye': "Thanks for you interest. Should you have further questions, please do not hesitate to contact \
        the master's coordination office by e-mail at miis@upf.edu or visit the master's website at \
        ww.upf.edu/iis. Have a nice day!",

        "basic-admission": "Basically, you would need an official undergraduate degree/diploma, or a bachelor's \
        degree, in engineering or architecture, technical engineering or technical architecture diplomas. A \
        letter of motivation and at least one letter of recommandation are also required, as well a proof that \
            you hold at least a B2.1 level of English. You can find all the details at \
        www.upf.edu/iis/requirements. Would you like me to give you more detailed information about the \
        formal admission requirements",

        "detailed-admission": "The admission procedure consist on two steps [...]. ",

        "admission-deadline": "There are several application periods, from November to June [...].",

        "duration": "The MIIS is a one-year long master.",

        "subjects" : "The core subjects treated in the master are: Autonomous Behaviour, Web intelligence, \
        Robotics, Machine Learning and Natural Language Interaction. Would you like me to give more \
        details about any of the subjects?",
        "subjects-as": "The focus of this course is autonomous behavior, and more precisely, the different methods for developing \"agents\" capable of making their own decisions in real or simulated environments. This includes characters in video-games, robots, softbots in the web, etc. The problem of developing autonomous agents is a fundamental problem in Artificial Intelligence, where three basic approaches have been developed: the programmer-based approach, where the agent responses are hardwired by a human programmer; the learning-based approach, where the agent learns to control its behavior from experience or  information obtained from a teacher, and the model-based approach, where the agent control is derived automatically from a model describing the goals, the actions available, and the sensing capabilities. In the course, we review the three approaches to developing autonomous systems, with emphasis on the model-based approach, which in AI goes under the name of planning. We study autonomy in dynamic, partially observable settings involving a single agent or multiple agents. The course involves theory and experimentation.",
        "subjects-ml": "Machine learning has achieved a great importance in recent years due to amount of data that is being collected that cannot be efficiently processed by humans. Learning sytems are used in a number of applications including recommending systems, spam filtering, etc. The course covers a number of machine learning formulations and algorithms: from supervised methods,  where information provided by a teacher in the form of samples needs to be generalized to unseen situations, to unsupervised methods that learn from experience. The former methods include the induction of decision trees from data, perceptron and neural network algorithms, and support vector machines. The latter include reinforcement learning and genetic algorithms. We also cover statistical learning methods, Hidden Markov Models, and probabilistic Bayesian Networks, and the theoretical aspects underlying learning approaches, so-called Computational Learning Theory.",
        "subjects-robotics": "Introduction to mobile robotics covering practical and theoretical aspects. Course will involve basic notions of robot locomotion, perception, localization, and action; robot architectures, and projects on real robots.",
        "subjects-natlang": "The couse covers the central themes involved in the interaction with intelligent agents through the use of natural language, with emphasis on dialogue and language generation. We  will also study planning techniques applied to the theory of speech acts and the use of rhetorical structures, both for controlled dialogues as for dynamic and non-cooperative dialogues. Regarding analysis and generation of language, students will learn robust and incremental techinques capable of dealing with partial, and even ungrammatical discourse, as it's typical of spontaneous dialogues. We will also look at the design of dialogue architectures, and analyze the use of dialogue in \"chatbots\" and videogames.",
        "subjects-web-intelligence": "Study how to gather, process, search and mine data in the Web and its applications to search engines. Understand the basic concepts behind information retrieval and data mining.",

        "fees": "The tuition fees are currently set to 2.837,82€ for EU students, and 7.817,82€ for non-EU  students. A limited number of scholarships is also available.",

        "language": "The master's courses are all taught in English",

        "scholarships": "A limited number of scholarships is available for the students of this program, \
        providing different levels of funding. Decisions on funding will be made after admission \
        taking into account the student record, the statement of purpose, and financial need.",

        "basic-professors": "The professors of the MIIS are all first-class researchers. Currently, courses are being offered by professors Ricardo Baeza-Yates, Vladimir Estivill-Castro, Hector Geffner, Gabor Lugosi and Leo Wanner. Would you like to know more about any of them?",
        "professors-geffner": "Hector Geffner is an ICREA Research Professor at the Department of Information and Communication Technologies, UPF. He obtained a BSc on  Electrical Engineering at the Universidad Simon Bolivar in Caracas, and a MSc in Systems Science and a PhD in Computer Science  at the University of California, Los Angeles (UCLA). After his PhD, he worked at the IBM T.J. Watson Research Center in NY, USA from 1989 until 1992, and at the Universidad Simon Bolivar, in Caracas, from 1992 until 2001. He also taught at Stanford University, Aachen University of Technology, Linkoping University, Universite Paul Sabatier, and the University of Edinburgh, among other places. Since 2001 he has been at the UPF in Barcelona, as an ICREA Research Professor where he heads the Artificial Intelligence (AI) group. ",
        "professors-baeza": "Ricardo Baeza-Yates is a part time Full Professor at the Department of Information and Communication Technologies, UPF. He  arrived initially as an ICREA Professor in 2005 but then in 2006 became Vice-President of Yahoo! Research for Europe, Middle East and Latin America,  leading the labs at Barcelona, Spain and Santiago, Chile, as well as supervising the lab in Haifa, Israel. From 2002 to 2004 he was the director of the Centre for Web Research at the Department of Computer Science of the Engineering School of the University of Chile, where he started his academic career in 1985, becoming Professor in 1994. He obtained a PhD in computer science at the University of Waterloo, Canada, in 1989. Before that, at the University of Chile, he completed two degrees, electronic engineering and computer science, in 1984 as well as the corresponding masters in 1986.",
        "professors-estivill": "Vladimir Estivill-Castro is a Full Professor at both the Department of Information and Communication Technologies, UPF, and at Griffith University, Brisbane, Australia. Vladimir  received a Mathematics degree (1985) and a Master degree on  Mathematics (1987) from UNAM, Mexico City. He then obtained a PhD in Computer Science in 1991 at the University of Waterloo in Canada. He was an Assistant Professor at York University in Canada, a Lecturer at the Queensland University of Technology from 1996 to 1998,  a Senior Lecturer  and then Associate Professor at the University of Newcastle, 1998-2001,  and Full Professor  at Griffith University.",
        "professors-lugosi": "Gabor Lugosi is an ICREA Research Professor at the Department of Economics and Business at Pompeu Fabra University. He arrived at Barcelona from Budapest in 1996 after being an Associate Professor at the Department of Mathematics and Computer Science at the Technical University of Budapest. He had obtained his PhD degree in Electrical Engineering from the Hungarian Academy of Sciences in 1991.",
        "professors-wanner": "Leo Wanner is an ICREA Research Professor at the Department of Information and Communication Technologies, UPF. Leo earned his Diploma degree in Computer Science from the University of Karlsruhe, Germany and his PhD in Linguistics from the University of The Saarland, Saarbrücken, Germany. Prior to joining DTIC as ICREA Research Professor, he held positions at the Institute for Integrated Publication and Information Systems of the German National Centre for Computer Science in Darmstadt, University of Waterloo, the University of Stuttgart and the Institute for Applied Linguistics (IULA), UPF. As a visiting researcher, he was also affiliated with the University of Montreal, University of Sydney, University of Southern California's Institute for Information Sciences, and the Columbia University, New York."




    },

    initialState: 'greeting',

    transitions: {
        "greeting":  [{to: "basic-question", auto: true}], // Auto transition
        "basic-question":  [{to: "basic-question-silent", auto: true}], // Auto transition
        "basic-question-silent": [
            { to: "basic-admission", kw: ["admission", "requirements"] },
            { to: "basic-professors", kw: ["professors", "teachers"] },
            { to: "subjects", kw: ['subjects', 'course', 'core'] },
            { to: "fees", kw: ['fees', 'price','how much', 'cost'] },
            { to: "language", kw: ['language'] },
            { to: "scholarships", kw: ['scholarships'] },
            { to: "admission-deadline", kw: ['deadline', 'period'] },
            { to: "duration", kw: ["duration", "years" ] }
        ],

        "subjects": [
            {to: "basic-question", kw: ['No'], default: true},
            {to: "subjects-as", kw: ['autonomous', 'system']},
            {to: "subjects-ml", kw: ['machine', 'learning']},
            {to: "subjects-robotics", kw: ['mobile', 'robotics']},
            {to: "subjects-natlang", kw: ['natural', 'language', 'interaction']},
            {to: "subjects-web-intelligence", kw: ['web', 'intelligence']}
        ],

        "subjects-as": [ {to: "basic-question-silent", auto: true} ],
        "subjects-ml": [ {to: "basic-question-silent", auto: true} ],
        "subjects-robotics": [ {to: "basic-question-silent", auto: true} ],
        "subjects-natlang": [ {to: "basic-question-silent", auto: true} ],
        "subjects-web-intelligence": [ {to: "basic-question-silent", auto: true} ],

        "basic-admission": [
            {to: "detailed-admission", kw: ['yes']},
            {to: "basic-question", kw: ['No'], default: true}
        ],

        "detailed-admission": [{to: "basic-question-silent", kw: ['No'], auto: true}],


        "basic-professors": [
            {to: "professors-geffner", kw: ['hector', 'geffner']},
            {to: "professors-baeza", kw: ['ricardo', 'baeza', 'yates']},
            {to: "professors-estivill", kw: ['vladimir', 'estivill', 'castro']},
            {to: "professors-lugosi", kw: ['bela', 'lugosi']},
            {to: "professors-wanner", kw: ['leo', 'wanner']},
            {to: "basic-question", kw: ['No'], default: true}
        ],

        "professors-geffner": [ {to: "basic-question-silent", auto: true} ],
        "professors-baeza": [ {to: "basic-question-silent", auto: true} ],
        "professors-estivill": [ {to: "basic-question-silent", auto: true} ],
        "professors-lugosi": [ {to: "basic-question-silent", auto: true} ],
        "professors-wanner": [ {to: "basic-question-silent", auto: true} ],

        "duration": [{to: "basic-question-silent", kw: ['No'], auto: true}],

        "scholarships": [{to: "basic-question-silent", kw: ['No'], auto: true}],

        "admission-deadline": [{to: "basic-question-silent", kw: ['No'], auto: true}],

        "fees": [
            {to: "basic-question-silent", kw: ['No'], auto: true}
        ],

        "language": [
            {to: "basic-question-silent", kw: ['No'], auto: true}
        ],

        "goodbye": [], // No transition: Final state

        "*": [
            { to: "goodbye", kw: ["goodbye", "ciao", "bye"] }
        ]
    }

};