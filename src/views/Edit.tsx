import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Download,
  ArrowLeft,
  Plus,
  Minus,
  Search,
  Layers,
  MapPinPlus,
  Pencil,
  ChevronDown,
  LoaderCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Map from 'MapProvider/MapComponentContainer';

import '@/assets/global.css';

import {
  getDictionary,
  getDictionaryFundsettings,
  getSpatialData,
  postSpatialData,
  putSpatialData
} from '@/api';

import { Material } from '@/types/spatialData';
import BaseItem from '@/components/BaseItem';
import TextareaItem from '@/components/TextareaItem';
import BaseItemNumber from '@/components/BaseItemNumber';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';
import BaseLabel from '@/components/BaseLabel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

const defaultMaterial: Material = {
  name: '',
  mainGeoObjectName: '',
  shortName: '',
  barcode: null,
  inventarNumber: null,
  coordinateSystem: null,
  projection: '',
  formats: [],
  materialCreatorId: null,
  mapOwner: '',
  storageSection: '',
  scale: null,
  yearCreate: null,
  yearConformity: null,
  secretStatus: null,
  accessConditions: '',
  location: '',
  materialTypeId: null,
  baseType: null,
  status: null,
  displayForm: null,
  areaBySheetFrameSquareMeter: null,
  baseUnitOfAccount: null,
  numberOfUnits: null,
  imageType: '',
  resolution: '',
  accuracy: '',
  cloudiness: null,
  lat: null,
  lng: null,
  geometryString: '',
  wmsLayer: '',
  accuracySpatialData: '',
  inventarNumberOfPd: '',
  copyNumber: '',
  note: '',
  numberOfSheets: null,
  coordSystemId: null,
  locationGuids: '',
  editor: '',
  serializedAdditionalFields: ''
};

export default function Edit({ id }: { id: string }) {
  const [data, setData] = useState<Material | null>(null);
  const [material, setMaterial] = useState<Material>(defaultMaterial);
  const [updatedMaterial, setUpdatedMaterial] = useState<Partial<Material>>({});
  const [baseDictionary, setBaseDictionary] = useState<{
    [key: string]: any[];
  }>({});
  const [isEdited, setIsEdited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSetBaseDictionary = <T,>(
    promiseResult: PromiseSettledResult<T>,
    key: string,
    setter: React.Dispatch<React.SetStateAction<T>>
  ): T | null | undefined => {
    if (promiseResult.status === 'fulfilled') {
      const promiseData = promiseResult.value;

      setter((prev) => ({ ...prev, [key]: promiseData }));

      return promiseData;
    } else if (promiseResult.status === 'rejected') {
      console.error(promiseResult.reason);

      return null;
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     getSpatialData(id).then((res: any) => {
  //       setMaterial(res)
  //       setIsLoaded(true);
  //     });
  //   })();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const p_material = getSpatialData(id);
      const p_secretStatusTypes = getDictionary('secretStatusTypes');
      const p_materialOrderTypes = getDictionary('materialOrderTypes');
      const p_basetype = getDictionary('basetype');
      const p_purchase_method = getDictionary('purchase_method');
      const p_material_form = getDictionary('material_form');
      const p_paper_size = getDictionary('paper_size');
      const p_condition = getDictionary('condition');
      const p_expiration = getDictionary('expiration');
      const p_dayoffs = getDictionary('dayoffs');
      const p_appform_structure = getDictionary('appform_structure');
      const p_appform = getDictionary('appform');
      const p_materialcreator = getDictionary('materialcreator');
      const p_coordinateSystems = getDictionary('coordinateSystems');
      const p_displayforms = getDictionary('displayforms');
      const p_order_types = getDictionary('order_types');
      const p_order_status = getDictionary('order_status');
      const p_materialtypes = getDictionary('materialtypes');
      const p_location = getDictionary('location');
      const p_materialformats = getDictionary('materialformats');
      const p_ListOfRackValues = getDictionaryFundsettings('ListOfRackValues');
      const p_ListOfSectionValues = getDictionaryFundsettings(
        'ListOfSectionValues'
      );
      const p_ListOfShelfValues =
        getDictionaryFundsettings('ListOfShelfValues');
      const p_ListOfCellValues = getDictionaryFundsettings('ListOfCellValues');
      const p_materialbaseunits = getDictionary('materialbaseunits');

      const [
        r_material,
        r_secrectStatusTypes,
        r_materialOrderTypes,
        r_baseType,
        r_purchase_method,
        r_material_form,
        r_paper_size,
        r_condition,
        r_expiration,
        r_dayoffs,
        r_appform_structure,
        r_appform,
        r_materialcreator,
        r_coordinateSystems,
        r_displayforms,
        r_order_types,
        r_order_status,
        r_materialtypes,
        r_location,
        r_materialformats,
        r_ListOfRackValues,
        r_ListOfSectionValues,
        r_ListOfShelfValues,
        r_ListOfCellValues,
        r_materialbaseunits
      ] = await Promise.allSettled([
        p_material,
        p_secretStatusTypes,
        p_materialOrderTypes,
        p_basetype,
        p_purchase_method,
        p_material_form,
        p_paper_size,
        p_condition,
        p_expiration,
        p_dayoffs,
        p_appform_structure,
        p_appform,
        p_materialcreator,
        p_coordinateSystems,
        p_displayforms,
        p_order_types,
        p_order_status,
        p_materialtypes,
        p_location,
        p_materialformats,
        p_ListOfRackValues,
        p_ListOfSectionValues,
        p_ListOfShelfValues,
        p_ListOfCellValues,
        p_materialbaseunits
      ]);

      handleSetBaseDictionary<any>(
        r_secrectStatusTypes,
        'secretStatusTypes',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_materialOrderTypes,
        'materialOrderTypes',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(r_baseType, 'basetype', setBaseDictionary);
      handleSetBaseDictionary<any>(
        r_purchase_method,
        'purchase_method',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_material_form,
        'material_form',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_paper_size,
        'paper_size',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(r_condition, 'condition', setBaseDictionary);
      handleSetBaseDictionary<any>(
        r_expiration,
        'expiration',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(r_dayoffs, 'dayoffs', setBaseDictionary);
      handleSetBaseDictionary<any>(
        r_appform_structure,
        'appform_structure',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(r_appform, 'appform', setBaseDictionary);
      handleSetBaseDictionary<any>(
        r_materialcreator,
        'materialcreator',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_coordinateSystems,
        'coordinateSystems',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_displayforms,
        'displayforms',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_order_types,
        'order_types',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_order_status,
        'order_status',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_materialtypes,
        'materialtypes',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(r_location, 'location', setBaseDictionary);
      handleSetBaseDictionary<any>(
        r_materialformats,
        'materialformats',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_ListOfRackValues,
        'ListOfRackValues',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_ListOfSectionValues,
        'ListOfSectionValues',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_ListOfShelfValues,
        'ListOfCellValues',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_ListOfCellValues,
        'ListOfCellValues',
        setBaseDictionary
      );
      handleSetBaseDictionary<any>(
        r_materialbaseunits,
        'materialbaseunits',
        setBaseDictionary
      );
      if (r_material.status === 'fulfilled') {
        const data = r_material.value;

        setMaterial(data);
      }
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  const updateMaterial = async () => {
    setSending(true);

    try {
      if (material) {
        const data = material;

        if (data.geometry) {
          delete data.geometry;
        }

        // data.geometryString = data.geometryString ? JSON.parse(data.geometryString) : null;

        await putSpatialData(id, data);
        toast.success('Материал успешно сохранен');
        setSending(false);
      }
    } catch (err) {
      toast.error('Ошибка при сохранении материала');
      setSending(false);
    }
  };

  const set = (key: string, value: any) => {
    setMaterial((prev: any) => ({ ...prev, [key]: value }));
  };

  const backHref = () => {
    const MODE = process.env.MODE;
    let href: string;

    if (MODE === 'production') {
      href = `/material/${id}`;
    } else if (MODE === 'local') {
      href = `/sakhagis/material/${id}`;
    } else if (MODE === 'development') {
      href = `/sakhagis/material/${id}`;
    } else {
      href = '';
    }

    return href;
  };

  return (
    <div className="h-full overflow-auto px-[30px]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-full py-[30px]">
        <Card className="flex flex-col lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pencil className="mr-2" size={20} />
              Редактирование материала
            </CardTitle>
          </CardHeader>
          <CardContent className="relative flex-1 p-0">
            <div className="absolute left-0 top-0 h-full w-full space-y-4 overflow-y-auto p-6 pt-0">
              {isLoaded && (
                <>
                  <BaseItem
                    label="Наименование*"
                    value={material?.name}
                    onChange={(event) => set('name', event.target.value)}
                  />
                  <BaseItem
                    label="Главный географический объект"
                    value={material?.mainGeoObjectName}
                    onChange={(event) =>
                      set('mainGeoObjectName', event.target.value)
                    }
                  />
                  <BaseItem
                    label="Короткое наименование*"
                    value={material?.shortName}
                    onChange={(event) => set('shortName', event.target.value)}
                  />
                  <BaseLabel label="Вид пространнственных данных*">
                    <Select
                      value={
                        baseDictionary?.materialtypes?.find(
                          (item) => item?.id == material?.materialTypeId
                        )?.id
                      }
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          materialTypeId: Number(value)
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите вид пространнственных данных" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseDictionary.materialtypes?.map((item: any) => (
                          <SelectItem value={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                  <BaseItem
                    label="Инвентарный номер*"
                    value={material?.inventarNumber}
                    onChange={(event) =>
                      set('inventarNumber', event.target.value)
                    }
                  />
                  <BaseLabel label="Система координат*">
                    <Select
                      value={
                        baseDictionary?.coordinateSystems?.find(
                          (item) => item?.id == material?.baseType
                        )?.id
                      }
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          coordinateSystem: Number(value) ?? null
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите систему координат" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseDictionary.coordinateSystems?.map((item: any) => (
                          <SelectItem value={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                  <BaseItem
                    label="Проекция"
                    value={material?.projection}
                    onChange={(event) => set('projection', event.target.value)}
                  />
                  <TextareaItem
                    label="Конур простр. данных в формате GeoJSON"
                    placeholder="Вставьте контур простр. данных в формате GeoJSON"
                    value={material?.geometryString ?? undefined}
                    onChange={(event) =>
                      set('geometryString', event.target.value)
                    }
                  />
                  <BaseLabel label="Формат хранения">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="flex h-10 w-full items-center justify-between px-3 py-2 font-normal text-muted-foreground"
                          variant="outline"
                        >
                          <span className="max-w-[90%] overflow-hidden text-ellipsis">
                            {(material?.formats)!.length > 0
                              ? material?.formats!.join(', ')
                              : 'Выбрать нужные форматы'}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="max-h-[250px] min-w-52 overflow-y-auto"
                        align="start"
                      >
                        {baseDictionary.materialformats?.map(
                          (item: string, index: number) => {
                            return (
                              <DropdownMenuCheckboxItem
                                checked={material?.formats?.includes(item)}
                                onCheckedChange={(value) => {
                                  setMaterial((prev) => ({
                                    ...prev,
                                    formats: prev.formats
                                      ? [...prev.formats, item]
                                      : null
                                  }));
                                }}
                              >
                                {item}
                              </DropdownMenuCheckboxItem>
                            );
                          }
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BaseLabel>
                  <BaseLabel label="Организация изготовитель*">
                    <Select
                      value={
                        baseDictionary?.materialcreator?.find(
                          (item) => item?.id == material?.materialCreatorId
                        )?.id
                      }
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          materialCreatorId: Number(value)
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите организацию" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseDictionary.materialcreator?.map((item: any) => (
                          <SelectItem value={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                  <BaseItem
                    label="Правообладатель"
                    value={material?.mapOwner}
                    onChange={(event) => set('projection', event.target.value)}
                  />
                  {/* TODO: Секция хранения */}
                  {/* <BaseLabel label="Секция хранения">
                <Dialog>
                  <DialogTrigger>
                    <Button
                      className="flex h-10 w-full items-center justify-between px-3 py-2 font-normal text-muted-foreground"
                      variant="outline"
                    >
                      Выбрать секцию хранения
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Секция хранения</DialogTitle>
                    </DialogHeader>
                    <DialogContent>
                      <div>
                        <Label>Стеллаж:</Label>
                        <Select
                          value={baseDictionary?.ListOfRackValues.find(item => material.storageSection)}
                          onValueChange={(value) =>
                            setMaterial((prev) => ({
                              ...prev,
                              storageSection: prev.storageSection ? prev.storageSection.split(',')[0].split(':')
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите стеллаж" />
                          </SelectTrigger>
                          <SelectContent>
                            {(baseDictionary?.ListOfRackValues as any)?.value?.split(',').map(
                              (item: any) => (
                                <SelectItem value={item}>
                                  {item}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </DialogContent>
                  </DialogContent>
                </Dialog>
              </BaseLabel> */}
                  <BaseItemNumber
                    label="Масштаб"
                    value={material?.scale}
                    onChange={(event) => set('scale', event.target.value)}
                  />
                  <BaseItemNumber
                    label="Год создания*"
                    value={material?.yearCreate}
                    onChange={(event) => set('yearCreate', event.target.value)}
                  />
                  <BaseItemNumber
                    label="Год соответствия местности*"
                    value={material?.yearConformity}
                    onChange={(event) =>
                      set('yearConformity', event.target.value)
                    }
                  />
                  <BaseLabel label="Секретность*">
                    <Select
                      value={
                        baseDictionary?.secretStatusTypes?.find(
                          (item) => item?.id == material?.secretStatus
                        )?.id
                      }
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          secretStatus: Number(value) ?? null
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите секретность" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseDictionary.secretStatusTypes?.map((item: any) => (
                          <SelectItem value={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                  <BaseItem
                    label="Условия доступа"
                    value={material?.accessConditions}
                    onChange={(event) =>
                      set('accessConditions', event.target.value)
                    }
                  />
                  {/* TODO: Местонахождение территории */}
                  <BaseLabel label="Базовый тип*">
                    <Select
                      value={
                        baseDictionary?.basetype?.find(
                          (item) => item?.id == material?.baseType
                        )?.id
                      }
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          baseType: Number(value)
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите базовый тип" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseDictionary.basetype?.map((item: any) => (
                          <SelectItem value={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                  <BaseLabel label="Статус*">
                    <Select
                      value={String(material.status)}
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          status: Number(value)
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Черновик</SelectItem>
                        <SelectItem value="1">Опубликовано</SelectItem>
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                  <BaseLabel label="Форма предоставления данных*">
                    <Select
                      value={
                        baseDictionary?.displayforms?.find(
                          (item) => item?.id == material?.displayForm
                        )?.id
                      }
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          displayForm: Number(value)
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите вид пространнственных данных" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseDictionary.displayforms?.map((item: any) => (
                          <SelectItem value={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                  <BaseItemNumber
                    label="Площадь по рамке листа, кв.м."
                    value={material?.areaBySheetFrameSquareMeter}
                    onChange={(event) =>
                      set('areaBySheetFrameSquareMeter', event.target.value)
                    }
                  />
                  <BaseItemNumber
                    label="Количество листов карты"
                    value={material?.numberOfSheets}
                    onChange={(event) =>
                      set('numberOfSheets', event.target.value)
                    }
                  />
                  <BaseItemNumber
                    label="Количество кадров"
                    value={material?.numberOfUnits}
                    onChange={(event) =>
                      set('numberOfUnits', event.target.value)
                    }
                  />
                  <BaseItem
                    label="WMS-слой"
                    value={material?.wmsLayer}
                    onChange={(event) => set('wmsLayer', event.target.value)}
                  />
                  <BaseItem
                    label="Вид изображения"
                    value={material?.imageType}
                    onChange={(event) => set('imageType', event.target.value)}
                  />
                  <BaseItem
                    label="Разрешение"
                    value={material?.resolution}
                    onChange={(event) => set('resolution', event.target.value)}
                  />
                  <BaseItem
                    label="Точность"
                    value={material?.accuracy}
                    onChange={(event) => set('accuracy', event.target.value)}
                  />
                  <BaseItemNumber
                    label="Облачность. %"
                    value={material?.cloudiness}
                    onChange={(event) =>
                      set('cloudiness', Number(event.target.value))
                    }
                  />
                  <BaseItemNumber
                    label="Широта*"
                    value={material?.lat}
                    onChange={(event) => set('lat', event.target.value)}
                  />
                  <BaseItemNumber
                    label="Долгота*"
                    value={material?.lng}
                    onChange={(event) => set('lng', event.target.value)}
                  />
                  <BaseLabel label="Базовая расчетная единица*">
                    <Select
                      value={
                        baseDictionary?.materialbaseunits?.find(
                          (item) => item?.id == material?.baseUnitOfAccount
                        )?.id
                      }
                      onValueChange={(value) =>
                        setMaterial((prev) => ({
                          ...prev,
                          baseUnitOfAccount: Number(value)
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите базовую расчетную единицу" />
                      </SelectTrigger>
                      <SelectContent>
                        {baseDictionary.materialbaseunits?.map((item: any) => (
                          <SelectItem value={item?.id}>{item?.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </BaseLabel>
                </>
              )}
              {!isLoaded && (
                <>
                  {new Array(10).fill(null).map((_, index) => (
                    <div className="space-y-1.5" key={index}>
                      <Skeleton className="h-3 w-[200px]" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </>
              )}
              {/* TODO: Базовая расчетная единица */}
              {/* <div>
                <Label className='font-medium'>Прикрепленные файлы</Label>
                <Input type='file' value={material.} onChange={(event) => set('')}></Input>
              </div> */}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Контур пространственных данных</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
              <Map type="spatial-data" geometry={data?.geometryString ?? ''} />
            </div>
          </CardContent>
        </Card>

        {false && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>
                Изображения предпросмотра пространственных данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Preview 1"
                  className="h-auto w-full rounded-lg"
                />
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Preview 2"
                  className="h-auto w-full rounded-lg"
                />
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Preview 3"
                  className="h-auto w-full rounded-lg"
                />
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Preview 4"
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Файлы пространственных данных</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.storageFilesList && data?.storageFilesList.length > 0 ? (
              <></>
            ) : (
              <div className="py-8 text-center text-gray-500">
                Нет доступных файлов
              </div>
            )}
          </CardContent>
        </Card> */}
      </div>

      <div className="mt-6 flex justify-between pb-[30px]">
        <a href={backHref()}>
          <Button variant="outline">
            <ArrowLeft className="mr-2" size={16} />
            Назад
          </Button>
        </a>
        <Button onClick={updateMaterial} disabled={!isLoaded || sending}>
          {sending ? (
            <>
              Сохранение{' '}
              <LoaderCircle className="ml-2 animate-spin duration-500" />
            </>
          ) : (
            'Сохранить изменения'
          )}
        </Button>
      </div>
    </div>
  );
}
