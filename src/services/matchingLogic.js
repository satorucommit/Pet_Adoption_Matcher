// src/services/matchingLogic.js
// Logic for matching adopters with pets based on quiz answers

/**
 * Calculate match score between adopter preferences and pet characteristics
 * @param {Object} adopterAnswers - The adopter's quiz answers
 * @param {Object} pet - The pet data from the API
 * @returns {number} Match score between 0-100
 */
export const calculateMatchScore = (adopterAnswers, pet) => {
  let score = 0;
  let totalFactors = 0;

  // Pet type preference
  if (adopterAnswers.petType && adopterAnswers.petType !== 'Either') {
    totalFactors++;
    const adopterType = adopterAnswers.petType.toLowerCase();
    const petType = pet.type?.toLowerCase();
    if (adopterType === petType) {
      score += 10;
    } else if (adopterType === 'other' && petType !== 'dog' && petType !== 'cat') {
      score += 10;
    }
  }

  // Size preference
  if (adopterAnswers.petSize && adopterAnswers.petSize !== 'No preference') {
    totalFactors++;
    const adopterSize = adopterAnswers.petSize.toLowerCase();
    const petSize = pet.size?.toLowerCase();
    if (adopterSize === petSize) {
      score += 8;
    } else {
      // Partial match for similar sizes
      const sizeMatch = {
        'small': ['small'],
        'medium': ['medium', 'small'],
        'large': ['large', 'medium'],
        'xlarge': ['xlarge', 'large']
      };
      
      if (sizeMatch[adopterSize]?.includes(petSize)) {
        score += 5;
      }
    }
  }

  // Age preference
  if (adopterAnswers.petAge) {
    totalFactors++;
    const adopterAge = adopterAnswers.petAge.toLowerCase();
    const petAge = pet.age?.toLowerCase();
    
    if (adopterAge === petAge) {
      score += 8;
    } else {
      // Partial match for similar ages
      const ageMatch = {
        'puppy/kitten': ['baby'],
        'young adult': ['young'],
        'adult': ['adult', 'young'],
        'senior': ['senior', 'adult']
      };
      
      const adopterAgeKey = adopterAge === 'puppy/kitten' ? 'puppy/kitten' : 
                            adopterAge === 'young adult' ? 'young adult' : 
                            adopterAge;
                            
      if (ageMatch[adopterAgeKey]?.includes(petAge)) {
        score += 5;
      }
    }
  }

  // Activity level match
  if (adopterAnswers.activity) {
    totalFactors++;
    const adopterActivity = adopterAnswers.activity.toLowerCase();
    // Estimate pet energy level based on age and breed (simplified)
    const petEnergy = estimatePetEnergyLevel(pet);
    
    // Match activity levels
    const activityMatch = {
      'very active (daily exercise)': ['high'],
      'moderately active (3-4 times a week)': ['high', 'medium'],
      'somewhat active (1-2 times a week)': ['medium', 'low'],
      'not very active': ['low']
    };
    
    if (activityMatch[adopterActivity]?.includes(petEnergy)) {
      score += 7;
    } else if (activityMatch[adopterActivity]?.includes(petEnergy === 'high' ? 'medium' : 
                                               petEnergy === 'medium' ? 'high' : 
                                               'medium')) {
      score += 4;
    }
  }

  // Time availability
  if (adopterAnswers.time) {
    totalFactors++;
    const adopterTime = adopterAnswers.time.toLowerCase();
    // Estimate pet care needs
    const petCareNeeds = estimatePetCareNeeds(pet);
    
    // Match time availability with pet needs
    const timeMatch = {
      'less than 1 hour': ['low'],
      '1-2 hours': ['low', 'medium'],
      '2-4 hours': ['medium', 'high'],
      'more than 4 hours': ['high']
    };
    
    if (timeMatch[adopterTime]?.includes(petCareNeeds)) {
      score += 7;
    }
  }

  // Experience level
  if (adopterAnswers.experience) {
    totalFactors++;
    const adopterExperience = adopterAnswers.experience.toLowerCase();
    // Estimate pet difficulty level
    const petDifficulty = estimatePetDifficulty(pet);
    
    // Match experience with pet difficulty
    const experienceMatch = {
      'first-time owner': ['easy'],
      'some experience': ['easy', 'medium'],
      'experienced owner': ['easy', 'medium', 'difficult'],
      'very experienced': ['easy', 'medium', 'difficult']
    };
    
    if (experienceMatch[adopterExperience]?.includes(petDifficulty)) {
      score += 6;
    }
  }

  // Housing situation
  if (adopterAnswers.housing) {
    totalFactors++;
    const adopterHousing = adopterAnswers.housing.toLowerCase();
    const petSize = pet.size?.toLowerCase();
    
    // Match housing with pet size
    if (adopterHousing === 'apartment' && petSize !== 'xlarge') {
      score += 5;
    } else if (adopterHousing === 'house with yard') {
      score += 5;
    } else if (adopterHousing === 'house without yard' && petSize !== 'xlarge') {
      score += 5;
    } else if (adopterHousing === 'farm') {
      score += 5;
    }
  }

  // Children in home
  if (adopterAnswers.children && pet.environment?.children !== undefined) {
    totalFactors++;
    const hasChildren = adopterAnswers.children.toLowerCase() !== 'no';
    const petGoodWithChildren = pet.environment.children;
    
    if (hasChildren && petGoodWithChildren) {
      score += 6;
    } else if (!hasChildren) {
      score += 3; // Not as important if no children
    }
  }

  // Other pets
  if (adopterAnswers.otherPets && pet.environment) {
    totalFactors++;
    const otherPets = adopterAnswers.otherPets.toLowerCase();
    let compatible = true;
    
    if (otherPets.includes('dogs') && pet.environment.dogs === false) {
      compatible = false;
    }
    if (otherPets.includes('cats') && pet.environment.cats === false) {
      compatible = false;
    }
    
    if (compatible) {
      score += 6;
    }
  }

  // Allergies consideration
  if (adopterAnswers.allergies && adopterAnswers.allergies.toLowerCase() !== 'no') {
    totalFactors++;
    // Hypoallergenic breeds (simplified)
    const hypoallergenicBreeds = [
      'poodle', 'bichon frise', 'maltese', 'schnauzer', 'terrier'
    ];
    
    const isHypoallergenic = pet.breeds?.primary && 
      hypoallergenicBreeds.some(breed => 
        pet.breeds.primary.toLowerCase().includes(breed));
    
    if (isHypoallergenic) {
      score += 5;
    } else if (adopterAnswers.allergies.toLowerCase().includes('severe')) {
      // Severe allergies, penalize non-hypoallergenic pets
      score -= 3;
    }
  }

  // Grooming preference
  if (adopterAnswers.grooming) {
    totalFactors++;
    const adopterGrooming = adopterAnswers.grooming.toLowerCase();
    const petGroomingNeeds = estimateGroomingNeeds(pet);
    
    if (adopterGrooming === 'significant' || 
        (adopterGrooming === 'moderate' && petGroomingNeeds !== 'high') ||
        (adopterGrooming === 'some' && petGroomingNeeds === 'low') ||
        (adopterGrooming === 'minimal' && petGroomingNeeds === 'low')) {
      score += 5;
    }
  }

  // Training time
  if (adopterAnswers.training) {
    totalFactors++;
    const adopterTrainingTime = adopterAnswers.training.toLowerCase();
    const petTrainingNeeds = estimateTrainingNeeds(pet);
    
    if (adopterTrainingTime === 'significant' || 
        (adopterTrainingTime === 'moderate' && petTrainingNeeds !== 'high') ||
        (adopterTrainingTime === 'some' && petTrainingNeeds === 'low') ||
        (adopterTrainingTime === 'minimal' && petTrainingNeeds === 'low')) {
      score += 5;
    }
  }

  // Budget consideration
  if (adopterAnswers.budget) {
    totalFactors++;
    // Estimate pet expenses (simplified)
    const petExpenses = estimatePetExpenses(pet);
    const adopterBudget = adopterAnswers.budget.toLowerCase();
    
    const budgetMatch = {
      'under $50': ['low'],
      '$50-$100': ['low', 'medium'],
      '$100-$200': ['medium', 'high'],
      'over $200': ['high']
    };
    
    if (budgetMatch[adopterBudget]?.includes(petExpenses)) {
      score += 5;
    }
  }

  // Travel frequency
  if (adopterAnswers.travel) {
    totalFactors++;
    const travelFrequency = adopterAnswers.travel.toLowerCase();
    // Pets with lower needs are better for frequent travelers
    const petNeedsLevel = estimatePetNeedsWhenTraveling(pet);
    
    if ((travelFrequency.includes('rarely') && petNeedsLevel !== 'high') ||
        (travelFrequency.includes('occasionally') && petNeedsLevel !== 'high') ||
        (travelFrequency.includes('frequently') && petNeedsLevel === 'low') ||
        (travelFrequency.includes('very frequently') && petNeedsLevel === 'low')) {
      score += 4;
    }
  }

  // Normalize score
  if (totalFactors > 0) {
    score = Math.round((score / (totalFactors * 10)) * 100);
    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));
  } else {
    // If no factors were considered, give a neutral score
    score = 50;
  }

  return score;
};

/**
 * Estimate pet energy level based on characteristics
 */
const estimatePetEnergyLevel = (pet) => {
  // Simplified estimation based on age, breed, and size
  const age = pet.age?.toLowerCase();
  const size = pet.size?.toLowerCase();
  
  if (age === 'baby' || age === 'young') return 'high';
  if (age === 'senior') return 'low';
  if (size === 'small') return 'medium';
  if (size === 'xlarge') return 'high';
  
  return 'medium';
};

/**
 * Estimate pet care needs
 */
const estimatePetCareNeeds = (pet) => {
  const age = pet.age?.toLowerCase();
  const size = pet.size?.toLowerCase();
  
  if (age === 'baby' || size === 'xlarge') return 'high';
  if (age === 'senior' || size === 'small') return 'low';
  return 'medium';
};

/**
 * Estimate pet difficulty level
 */
const estimatePetDifficulty = (pet) => {
  // Consider age, training status, and special needs
  const age = pet.age?.toLowerCase();
  const isTrained = pet.attributes?.house_trained;
  const hasSpecialNeeds = pet.attributes?.special_needs;
  
  if (age === 'baby' || hasSpecialNeeds) return 'difficult';
  if (age === 'senior' || isTrained) return 'easy';
  return 'medium';
};

/**
 * Estimate grooming needs
 */
const estimateGroomingNeeds = (pet) => {
  const coat = pet.coat?.toLowerCase();
  const breed = pet.breeds?.primary?.toLowerCase();
  
  if (coat === 'long' || breed?.includes('poodle') || breed?.includes('shepherd')) {
    return 'high';
  }
  if (coat === 'medium' || breed?.includes('retriever')) {
    return 'medium';
  }
  return 'low';
};

/**
 * Estimate training needs
 */
const estimateTrainingNeeds = (pet) => {
  const age = pet.age?.toLowerCase();
  const isTrained = pet.attributes?.house_trained;
  const breed = pet.breeds?.primary?.toLowerCase();
  
  if (age === 'baby' || !isTrained) return 'high';
  if (age === 'senior') return 'low';
  if (breed?.includes('retriever') || breed?.includes('shepherd')) return 'medium';
  return 'medium';
};

/**
 * Estimate pet expenses
 */
const estimatePetExpenses = (pet) => {
  const age = pet.age?.toLowerCase();
  const size = pet.size?.toLowerCase();
  const hasSpecialNeeds = pet.attributes?.special_needs;
  
  if (hasSpecialNeeds || age === 'senior' || size === 'xlarge') return 'high';
  if (age === 'baby' || size === 'large') return 'medium';
  return 'low';
};

/**
 * Estimate pet needs when traveling
 */
const estimatePetNeedsWhenTraveling = (pet) => {
  const age = pet.age?.toLowerCase();
  const hasSpecialNeeds = pet.attributes?.special_needs;
  
  if (age === 'baby' || age === 'senior' || hasSpecialNeeds) return 'high';
  return 'low';
};

/**
 * Get matched pets with scores
 * @param {Object} adopterAnswers - The adopter's quiz answers
 * @param {Array} pets - Array of pet objects
 * @returns {Array} Pets with added matchScore property
 */
export const getMatchedPets = (adopterAnswers, pets) => {
  if (!adopterAnswers || !pets || !Array.isArray(pets)) {
    return [];
  }

  return pets.map(pet => {
    const matchScore = calculateMatchScore(adopterAnswers, pet);
    return {
      ...pet,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending
};