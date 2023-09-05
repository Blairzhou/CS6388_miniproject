"""
This is where the implementation of the plugin code goes.
The undo-class is imported from both run_plugin.py and run_debug.py
"""
import sys
import logging
from webgme_bindings import PluginBase

# Setup a logger
logger = logging.getLogger('undo')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)  # By default it logs to stderr..
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class undo(PluginBase):
  def main(self):
    active_node = self.active_node
    core = self.core
    logger = self.logger
    self.namespace = None
    META = self.META
    nodeHash= {}
    for node in core.load_sub_tree(active_node):
      nodeHash[core.get_path(node)] = node
      
    
    logger.debug('path: {0}'.format(core.get_path(active_node)))
    logger.info('name: {0}'.format(core.get_attribute(active_node, 'name')))
    logger.warn('pos : {0}'.format(core.get_registry(active_node, 'position')))
    logger.error('guid: {0}'.format(core.get_guid(active_node)))
    
    
    
    def undo():
      operations = {}
      childrenIds = core.get_children_path(active_node)
      for childIds in childrenIds:
        if core.is_instance_of(nodeHash[childId], META['Operation']):
          order = core.get_attribute(nodeHash[childId], 'order')
          operations[order] = childId
      core.delete_node(nodeHash[operation[len(operations)-1]])
      self.until.save(core.get_root(active_node), self.commit_hash, 'master', 'undo')
      
    
    
    

