import type { TechnologiesDTO } from '@/services/profile';
import { profileService } from '@/services/profile';
import type { Result } from '@/utils/result';
import { UserDTOSchema, type ProfilePM } from './profile.model';
import { mapUserDTOtoPM } from './profile.utils';

class ProfileRepository {
  getProfile(): Result<ProfilePM> {
    try {
      const result = profileService.getProfile();

      if (!result.ok) {
        return {
          ok: false,
          error: result.error,
        };
      }

      const validationResult = UserDTOSchema.safeParse(result.data);

      if (!validationResult.success) {
        return {
          ok: false,
          error: {
            kind: 'Validation',
            message: 'Failed to validate profile data',
            cause: validationResult.error,
          },
        };
      }

      const parsedProfile = mapUserDTOtoPM(validationResult.data);

      return {
        ok: true,
        data: parsedProfile,
      };
    } catch (error) {
      return {
        ok: false,
        error: {
          kind: 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          cause: error,
        },
      };
    }
  }

  // Returns TechnologiesDTO directly (serves as PM since they have the same structure)
  getTechnologies(): Result<TechnologiesDTO> {
    try {
      const result = profileService.getTechnologies();

      if (!result.ok) {
        return result;
      }

      return {
        ok: true,
        data: result.data,
      };
    } catch (error) {
      return {
        ok: false,
        error: {
          kind: 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          cause: error,
        },
      };
    }
  }
}

export const profileRepository = new ProfileRepository();
