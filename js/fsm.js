/**
 * Guillem Francès <guillem.frances@gmail.com>
 *
 * This file contains the full Finite-State machine codification.
 */


var fsm = {
    stateMessages: {
        'greeting': 'Hello, this is the MIIS information agent',

        "basic-question": "How can I help you?",

        'goodbye': "Thanks for you interest. Should you have further questions, please do not hesitate to contact \
        the master's coordination office by e-mail at miis@upf.edu or visit the master's website at \
        ww.upf.edu/iis, Have a nice day.",

        "admission": "",
        "subjects" : "The core subjects treated in the master are: Autonomous Behaviour, Web intelligence, \
        Robotics, Machine Learning and Natural Language Interaction. Would you like me to give more \
        details about any of the subjects?",

        "fees": "The tuition fees are currently set to 2.837,82€ for EU students, and 7.817,82€ for non-EU  students.",

        "language": "The master's courses are all taught in English",

        "scholarships": "A limited number of scholarships is available for the students of this program, \
        providing different levels of funding. Decisions on funding will be made after admission \
        taking into account the student record, the statement of purpose, and financial need.",





        "no-match": "Sorry I didn't understand."
    },

    initialState: 'greeting',

    transitions: {
        "greeting":  [{to: "basic-question", auto: true, kw: []}], // Auto transition
        "basic-question": [
            { to: "admission", kw: ["admission"] },
            { to: "subjects", kw: ['subjects'] },
            { to: "fees", kw: ['fees'] },
            { to: "language", kw: ['language'] },
            { to: "scholarships", kw: ['scholarships'] }
//            { to: "subjects", kw: [] },

        ],

        "subjects": [
            {to: "greeting", kw: ['No']}
        ],

        "fees": [
            {to: "greeting", kw: ['No']}
        ],

        "language": [
            {to: "greeting", kw: ['No']}
        ],

        "goodbye": [],

        "*": [
            { to: "goodbye", kw: ["goodbye", "ciao", "bye"] }
        ],

        "no-match": []
    }

};