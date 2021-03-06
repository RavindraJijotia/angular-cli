import { CommandScope, Option } from '../models/command';
import { SchematicCommand, CoreSchematicOptions } from '../models/schematic-command';

export interface UpdateOptions extends CoreSchematicOptions {
  next: boolean;
  schematic?: boolean;
}


export default class UpdateCommand extends SchematicCommand {
  public readonly name = 'update';
  public readonly description = 'Updates your application and its dependencies.';
  public static aliases: string[] = [];
  public readonly scope = CommandScope.inProject;
  public readonly arguments: string[] = [ 'packages' ];
  public options: Option[] = [
    ...this.coreOptions,
  ];
  public readonly allowMissingWorkspace = true;

  private collectionName = '@schematics/update';
  private schematicName = 'update';

  private initialized = false;
  public async initialize(options: any) {
    if (this.initialized) {
      return;
    }
    super.initialize(options);
    this.initialized = true;

    const availableOptions: Option[] = await this.getOptions({
      schematicName: this.schematicName,
      collectionName: this.collectionName,
    });
    this.options = this.options.concat( availableOptions || []);
  }

  public async run(options: UpdateOptions) {

    const schematicRunOptions = {
      collectionName: this.collectionName,
      schematicName: this.schematicName,
      schematicOptions: options,
      dryRun: options.dryRun,
      force: options.force,
      workingDir: this.project.root,
    };

    return this.runSchematic(schematicRunOptions);
  }
}
