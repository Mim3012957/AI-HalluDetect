const HALLUCINATION_PATTERNS = [

  // 1. FABRICATED PACKAGES
  {
    id: "FAB_PKG_001",
    type: "Fabricated Package",
    severity: "high",
    language: "python",
    pattern: /sklearn\.magic|sklearn\.autofix|sklearn\.wizard/gi,
    title: "Non-existent scikit-learn submodule",
    desc: "sklearn.magic does not exist in scikit-learn's public API. AI models frequently hallucinate plausible-sounding submodules.",
    fix: "from sklearn.preprocessing import StandardScaler",
    paper: "CodeHalu · Tian et al. 2024"
  },

  {
    id: "FAB_PKG_002",
    type: "Fabricated Package",
    severity: "high",
    language: "python",
    pattern: /numpy\.autofix|numpy\.magic|numpy\.smart/gi,
    title: "Non-existent NumPy submodule",
    desc: "NumPy does not have autofix or magic submodules. This is a common hallucination pattern in AI-generated data science code.",
    fix: "import numpy as np",
    paper: "HALLUCODE · Liu et al. 2024"
  },

  {
    id: "FAB_PKG_003",
    type: "Fabricated Package",
    severity: "high",
    language: "python",
    pattern: /from pandas\.enhance|from pandas\.ai|from pandas\.smart/gi,
    title: "Non-existent pandas submodule",
    desc: "pandas.enhance and similar submodules do not exist. AI models hallucinate enhancement utilities that sound plausible.",
    fix: "import pandas as pd",
    paper: "CodeHalu · Tian et al. 2024"
  },

  // 2. NON-EXISTENT METHODS
  {
    id: "FAKE_METHOD_001",
    type: "Non-existent Method",
    severity: "high",
    language: "python",
    pattern: /\.auto_correct\(|\.auto_fix\(|\.smart_fix\(/gi,
    title: "Fabricated auto-correction method",
    desc: "No standard ML framework exposes auto_correct() or auto_fix(). This pattern of magic fix methods is a documented hallucination signature.",
    fix: "result = model.predict(data)",
    paper: "Zhang et al. · ISSTA 2024"
  },

  {
    id: "FAKE_METHOD_002",
    type: "Non-existent Method",
    severity: "high",
    language: "python",
    pattern: /\.optimize_automatically\(|\.self_tune\(|\.auto_tune\(/gi,
    title: "Fabricated auto-optimization method",
    desc: "Methods like optimize_automatically() do not exist in standard libraries. AI models hallucinate convenience methods that sound logical.",
    fix: "Use GridSearchCV or manual hyperparameter tuning instead",
    paper: "HALLUCODE · Liu et al. 2024"
  },

  // 3. WRONG SYNTAX CONFIDENCE
  {
    id: "WRONG_SYNTAX_001",
    type: "Wrong Syntax Confidence",
    severity: "medium",
    language: "python",
    pattern: /import tensorflow\.keras\.magic|import torch\.wizard/gi,
    title: "Hallucinated deep learning submodule",
    desc: "tensorflow.keras.magic and torch.wizard do not exist. AI confidently writes non-existent deep learning utilities.",
    fix: "from tensorflow import keras  OR  import torch.nn as nn",
    paper: "Zhang et al. · ISSTA 2024"
  },

  {
    id: "WRONG_SYNTAX_002",
    type: "Wrong Syntax Confidence",
    severity: "medium",
    language: "python",
    pattern: /\.fit_and_explain\(|\.train_and_evaluate\(/gi,
    title: "Chained method hallucination",
    desc: "fit_and_explain() combines two operations that don't exist as a single method. AI chains operations into fake convenience methods.",
    fix: "model.fit(X_train, y_train)\nmodel.score(X_test, y_test)",
    paper: "CodeMirage · Agarwal et al. 2024"
  },

  // 4. JAVASCRIPT PATTERNS
  {
    id: "JS_FAKE_001",
    type: "Fabricated API",
    severity: "high",
    language: "javascript",
    pattern: /navigator\.ai\.generate|navigator\.ml\.predict/gi,
    title: "Non-existent browser AI API",
    desc: "navigator.ai.generate does not exist in any browser's Web API. AI hallucinates browser-native ML capabilities.",
    fix: "Use an external AI API like Gemini or OpenAI instead",
    paper: "HALLUCODE · Liu et al. 2024"
  },

  {
    id: "JS_FAKE_002",
    type: "Non-existent Method",
    severity: "medium",
    language: "javascript",
    pattern: /array\.smartFilter\(|array\.autoSort\(|\.magicMap\(/gi,
    title: "Fabricated array method",
    desc: "smartFilter(), autoSort(), magicMap() are not part of JavaScript's Array prototype. Common hallucination in JS code generation.",
    fix: "Use .filter(), .sort(), or .map() instead",
    paper: "Zhang et al. · ISSTA 2024"
  },
  // 5. JAVASCRIPT FETCH HALLUCINATIONS
  {
    id: "JS_FETCH_001",
    type: "Non-existent Method",
    severity: "high",
    language: "javascript",
    pattern: /\.toJSON\(\)/gi,
    title: ".toJSON() does not exist on fetch Response",
    desc: "fetch() returns a Response object. The correct method is .json() not .toJSON(). AI models confuse this frequently.",
    fix: "const users = await fetch(url).then(res => res.json())",
    paper: "Zhang et al. · ISSTA 2024"
  },

  {
    id: "JS_FETCH_002",
    type: "Non-existent Method",
    severity: "high",
    language: "javascript",
    pattern: /\.filterBy\(|\.sortAlphabetically\(|\.take\(/gi,
    title: "Fabricated array chain methods",
    desc: ".filterBy(), .sortAlphabetically(), .take() are not part of JavaScript's Array prototype. AI invents convenient chaining methods that don't exist.",
    fix: "users.filter(u => u.active).sort((a,b) => a.name.localeCompare(b.name)).slice(0,5)",
    paper: "HALLUCODE · Liu et al. 2024"
  },

  {
    id: "JS_OBJ_001",
    type: "Fabricated API",
    severity: "high",
    language: "javascript",
    pattern: /Object\.deepClone\(/gi,
    title: "Object.deepClone() does not exist",
    desc: "Object.deepClone() is not a standard JavaScript method. AI hallucinates this as a convenient deep copy utility.",
    fix: "const profile = structuredClone(activeUsers[0])  // or JSON.parse(JSON.stringify(obj))",
    paper: "CodeHalu · Tian et al. 2024"
  },

  {
    id: "JS_OBJ_002",
    type: "Non-existent Method",
    severity: "medium",
    language: "javascript",
    pattern: /\.set\(["'].*["'],/gi,
    title: ".set() does not exist on plain objects",
    desc: ".set() works on Map objects only, not plain JavaScript objects. AI confuses Map API with plain object property assignment.",
    fix: "profile.lastLogin = Date.now()",
    paper: "Zhang et al. · ISSTA 2024"
  },

  {
    id: "JS_STRING_001",
    type: "Fabricated API",
    severity: "high",
    language: "javascript",
    pattern: /String\.generateUUID\(/gi,
    title: "String.generateUUID() does not exist",
    desc: "String has no static generateUUID() method. AI hallucinates convenient UUID generation on built-in objects.",
    fix: "const id = crypto.randomUUID()",
    paper: "HALLUCODE · Liu et al. 2024"
  },

  {
    id: "JS_PROMISE_001",
    type: "Fabricated API",
    severity: "high",
    language: "javascript",
    pattern: /Promise\.sleep\(/gi,
    title: "Promise.sleep() does not exist",
    desc: "Promise has no sleep() method. This is one of the most commonly hallucinated JavaScript utilities.",
    fix: "await new Promise(resolve => setTimeout(resolve, 1000))",
    paper: "CodeMirage · Agarwal et al. 2024"
  },

  {
    id: "JS_DOM_001",
    type: "Fabricated API",
    severity: "high",
    language: "javascript",
    pattern: /document\.renderHTML\(/gi,
    title: "document.renderHTML() does not exist",
    desc: "document has no renderHTML() method. AI invents convenient DOM rendering utilities that don't exist in the Web API.",
    fix: "document.querySelector('#app').innerHTML = `<h1>...</h1>`",
    paper: "Zhang et al. · ISSTA 2024"
  },

  {
    id: "JS_STORAGE_001",
    type: "Non-existent Method",
    severity: "medium",
    language: "javascript",
    pattern: /localStorage\.saveObject\(/gi,
    title: "localStorage.saveObject() does not exist",
    desc: "localStorage only has setItem() and getItem(). AI hallucinates object-aware storage methods that handle serialization automatically.",
    fix: "localStorage.setItem('profile', JSON.stringify(profile))",
    paper: "HALLUCODE · Liu et al. 2024"
  },

  {
    id: "JS_ARRAY_001",
    type: "Fabricated API",
    severity: "high",
    language: "javascript",
    pattern: /Array\.range\(|\.multiplyBy\(|\.sum\(\)/gi,
    title: "Fabricated Array static and chain methods",
    desc: "Array.range(), .multiplyBy(), .sum() do not exist in JavaScript. AI hallucinates utility methods common in other languages like Python or Ruby.",
    fix: "[...Array(10).keys()].map(x => (x+1) * 2).reduce((a,b) => a+b, 0)",
    paper: "CodeHalu · Tian et al. 2024"
  },
];
