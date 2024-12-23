import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

import {
  DistrictLocation,
  LocationDictionary,
  NaslegLocation,
  TownLocation
} from '@/types/general';

import { X } from 'lucide-react';

interface LocationModalProps {
  showLocationModal: boolean;
  setShowLocationModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDistricts: DistrictLocation[];
  setSelectedDistricts: React.Dispatch<
    React.SetStateAction<DistrictLocation[]>
  >;
  selectedNaslegs: NaslegLocation[];
  setSelectedNaslegs: React.Dispatch<React.SetStateAction<NaslegLocation[]>>;
  selectedTowns: TownLocation[];
  setSelectedTowns: React.Dispatch<React.SetStateAction<TownLocation[]>>;
  locationDictionary: LocationDictionary;
}

const LocationModal = ({
  showLocationModal,
  setShowLocationModal,
  selectedDistricts,
  setSelectedDistricts,
  selectedNaslegs,
  setSelectedNaslegs,
  selectedTowns,
  setSelectedTowns,
  locationDictionary
}: LocationModalProps) => {
  return (
    <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
      <DialogContent
        defaultClose={false}
        className="z-[1000] sm:max-w-[1000px]"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="max-w-[80%]">
            Выбор местоположения
          </DialogTitle>
          <DialogClose asChild>
            <Button size="icon" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Районы</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {locationDictionary &&
                    locationDictionary.districts.map((district) => (
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          checked={selectedDistricts.some(
                            (sDistrict) => sDistrict.name === district.name
                          )}
                          onCheckedChange={() => {
                            setSelectedNaslegs([]);
                            setSelectedTowns([]);

                            selectedDistricts.some(
                              (sDistrict) => sDistrict.name === district.name
                            )
                              ? setSelectedDistricts((prev) =>
                                  prev.filter(
                                    (item) => item.name !== district.name
                                  )
                                )
                              : setSelectedDistricts((prev) => [
                                  ...prev,
                                  district
                                ]);
                          }}
                        />
                        <Label>{district.fullName}</Label>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Наслеги</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {locationDictionary &&
                    locationDictionary.naslegs
                      .filter((nasleg) =>
                        selectedDistricts.some(
                          (sDistrict) => sDistrict.id === nasleg.districtID
                        )
                      )
                      .map((nasleg) => (
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            checked={selectedNaslegs.some(
                              (sNasleg) => sNasleg.name === nasleg.name
                            )}
                            onCheckedChange={() => {
                              setSelectedTowns([]);

                              selectedNaslegs.some(
                                (sNasleg) => sNasleg.name === nasleg.name
                              )
                                ? setSelectedNaslegs((prev) =>
                                    prev.filter(
                                      (item) => item.name !== nasleg.name
                                    )
                                  )
                                : setSelectedNaslegs((prev) => [
                                    ...prev,
                                    nasleg
                                  ]);
                            }}
                          />
                          <Label>{nasleg.name}</Label>
                        </div>
                      ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Населенные пункты</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {locationDictionary &&
                    locationDictionary.towns
                      .filter((town) =>
                        selectedNaslegs.some(
                          (sNasleg) => sNasleg.id === town.naslegID
                        )
                      )
                      .map((town) => (
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            checked={selectedTowns.some(
                              (sTown) => sTown.name === town.name
                            )}
                            onCheckedChange={() =>
                              selectedTowns.some(
                                (sTown) => sTown.name === town.name
                              )
                                ? setSelectedTowns((prev) =>
                                    prev.filter(
                                      (item) => item.name !== town.name
                                    )
                                  )
                                : setSelectedTowns((prev) => [...prev, town])
                            }
                          />
                          <Label>{town.name}</Label>
                        </div>
                      ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="mt-3 flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setShowLocationModal(false);
              setSelectedDistricts([]);
              setSelectedNaslegs([]);
              setSelectedTowns([]);
            }}
          >
            Отмена
          </Button>
          <Button
            onClick={() => {
              setShowLocationModal(false);
            }}
          >
            Подтвердить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
