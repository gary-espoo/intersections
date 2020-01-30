import {Test, TestingModule} from '@nestjs/testing';
import {MergeksortedHelper} from './mergeksorted.helper';

describe('MergeksortedHelper', () => {
    let provider : MergeksortedHelper;

    beforeEach(async() => {
        const module : TestingModule = await Test
            .createTestingModule({providers: [MergeksortedHelper]})
            .compile();

        provider = module.get < MergeksortedHelper > (MergeksortedHelper);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });


    it('should be pass', () => {
      let violation = [
          [
              {
                  id: 612,
                  intersection: 4,
                  time: '2020-01-01 00:19:00',
                  speed: 69
              }, {
                  id: 1712,
                  intersection: 4,
                  time: '2020-01-1 00:54:00',
                  speed: 83
              }, {
                  id: 2787,
                  intersection: 4,
                  time: '2020-01-01 01:27:00',
                  speed: 37
              }, {
                  id: 2901,
                  intersection: 4,
                  time: '2020-01-01 01:34:00',
                  speed: 58
              }
          ],

          [
              {
                  id: 622,
                  intersection: 3,
                  time: '2020-01-1 00:09:00',
                  speed: 23
              }
          ]
      ];
      let result = provider.merge(violation);
      expect(result[0].id).toBe(622);

  });
    it('should be pass', () => {
        let violation = [
            [
                {
                    id: 612,
                    intersection: 4,
                    time: '2020-01-01 00:19:00',
                    speed: 69
                }, {
                    id: 1712,
                    intersection: 4,
                    time: '2020-01-1 00:54:00',
                    speed: 83
                }, {
                    id: 2787,
                    intersection: 4,
                    time: '2020-01-01 01:27:00',
                    speed: 37
                }, {
                    id: 2901,
                    intersection: 4,
                    time: '2020-01-01 01:34:00',
                    speed: 58
                }
            ],

            [
                {
                    id: 622,
                    intersection: 3,
                    time: '2020-01-1 00:09:00',
                    speed: 23
                }, {
                    id: 24,
                    intersection: 3,
                    time: '2020-01-01 00:17:00',
                    speed: 13
                }, {
                    id: 2164,
                    intersection: 3,
                    time: '2020-01-1 02:08:00',
                    speed: 94
                }, {
                    id: 2392,
                    intersection: 3,
                    time: '2020-01-01 02:36:00',
                    speed: 23
                }
            ]
        ];
        let result = provider.merge(violation);
        expect(result[0].id).toBe(622);

    });
});
