import { CONFIG } from "../config"

/// Change the TEST_CAMPAIGN_ID to match your campaign (find it on the rewards server)
/// Change the TEST_CAMPAIGN_KEY to match the item from your campaign (on the rewards server)


export type ClaimConfigInstType = {
    campaign: string,
    campaignKeys: Record<string, string>
}

const TEST_CAMPAIGN_ID = '3478b75f-a344-4fc9-8039-37ff1c2a6f9d'
const FOUND_CAMPAIGN_ID = '91b33aec-8afd-48fe-a3e4-04882ef66d7b'
//non captcha
const TEST_CAMPAIGN_KEY = 'qpb9r3ttTAGTnDopTqjBMpGzOuyK/Uj+o+QEiC72bXs=.3/i0YE0m8TeRjUppz2+xkXt5o/wjQJhYOcgeyc6GWB4='
const FOUND_CAMPAIGN_KEY = '82hIAcRgTpmZdv8GJVXDsZGzOuyK/Uj+o+QEiC72bXs=.GBI58Owa/G3nwH+FvbEglGwEnQ2i1r1B97QgeLBBKH8='


export const ClaimConfig = {
    rewardsServer: 'https://rewards.decentraland.org',
    campaign: {
        CAMPAIGN_TEST: {
            campaign: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_ID : '3478b75f-a344-4fc9-8039-37ff1c2a6f9d',
            campaignKeys: {
                // wearable
                KEY_0: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY : "R04A1hLOTYmBVoNMOkNWMTR4t1+jRE/JgDk3/xwqb50=.ktcvpMUTwFnWa7603sBUIkmkymbLv5DrDXKlLYMS1Cw=",
           
            },
        },
        CAMPAIGN_FOUND: {
            campaign: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? FOUND_CAMPAIGN_ID : '91b33aec-8afd-48fe-a3e4-04882ef66d7b',
            campaignKeys: {
                KEY_3: CONFIG.CONFIG_CLAIM_TESTING_ENABLED ? FOUND_CAMPAIGN_KEY : '82hIAcRgTpmZdv8GJVXDsZGzOuyK/Uj+o+QEiC72bXs=.GBI58Owa/G3nwH+FvbEglGwEnQ2i1r1B97QgeLBBKH8='
            },
        },
    },
 
}