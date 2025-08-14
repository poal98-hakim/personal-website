import profileData from '@/data/profile.json';
import technologiesData from '@/data/technologies.json';
import { Result, err, ok } from '@/utils/result';
import type { TechnologiesDTO, UserDTO } from './profile.model';

class ProfileService {
  // Get profile from static data
  getProfile(): Result<UserDTO> {
    try {
      return ok(profileData);
    } catch (error) {
      return err('Unknown', 'Failed to load static profile data', error);
    }
  }

  // Get technologies data
  getTechnologies(): Result<TechnologiesDTO> {
    try {
      return ok(technologiesData);
    } catch (error) {
      return err('Unknown', 'Failed to load technologies data', error);
    }
  }
}

export const profileService = new ProfileService();
